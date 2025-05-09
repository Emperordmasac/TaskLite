import z from 'zod'
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { zValidator } from '@hono/zod-validator';

import { getMember } from '@/features/members/lib/utils';
import { createTaskSchema } from '@/features/tasks/lib/schemas';

import { createAdminClient } from '@/lib/appwrite';
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { Task, TaskStatus } from '../lib/types';
import { Project } from '@/features/projects/lib/types';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator('query', z.object({
      workspaceId: z.string(),
      projectId: z.string().nullish(),
      asigneeId: z.string().nullish(),
      status: z.nativeEnum(TaskStatus).nullish(),
      search: z.string().nullish(),
      dueDate: z.string().nullish()
    })),
    async (c) => {
      const user = c.get('user')
      const databases = c.get('databases')
      const { users } = await createAdminClient()

      const { 
        workspaceId, 
        asigneeId, 
        dueDate, 
        projectId, 
        search, 
        status 
      } = c.req.valid('query')

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      const query = [
        Query.equal('workspaceId', workspaceId),
        Query.orderDesc('$createdAt')
      ]

      if ( projectId ) {
        query.push(Query.equal('projectId', projectId))
      }

      if ( asigneeId ) {
        query.push(Query.equal('assigneeId', asigneeId))
      }
 
      if ( status ) {
        query.push(Query.equal('status', status))
      }

      if ( search ) {
        query.push(Query.search('name', search))
      }

      if ( dueDate ) {
        query.push(Query.equal('dueDate', dueDate))
      }


      const tasks = await databases.listDocuments<Task>(
        DATABASE_ID,
        TASKS_ID,
        query
      )

      const projectIds = tasks.documents.map((task) => task.projectId)
      const asigneeIds = tasks.documents.map((task) => task.assigneeId)

      const projects = await databases.listDocuments<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectIds.length > 0 ? [Query.contains('$id', projectIds)] : []
      )

      const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        asigneeIds.length > 0 ? [Query.contains('$id', asigneeIds)] : []
      )

      const asignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId)

          return {
            ...member,
            name: user.name || user.email,
            email: user.email
          }
        })
      )

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find((project) => project.$id === task.projectId)

        const assignee = asignees.find((asignee) => asignee.$id === task.assigneeId)

        return {
          ...task,
          project,
          assignee
        }
      })

      return c.json({ data: {...tasks, populatedTasks} })
    }
  )
  .get(
    "/:taskId",
    sessionMiddleware,
    async (c) => {
      const currentUser =  c.get('user')
      const databases =  c.get('databases')
      
      const { users } = await createAdminClient()
      
      const { taskId } = c.req.param()

      const task = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId
      )

      const currentMember = await getMember({
        databases,
        workspaceId: task.workspaceId,
        userId: currentUser.$id
      })

      if(!currentMember) {
        return c.json({error: 'Unauthorized'}, 401)
      }
      
      const project = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        task.projectId
      )

      const member = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        task.assigneeId
      )

      const user = await users.get(member.userId)

      const assignee = {
        ...member,
        name: user.name || user.email,
        email: user.email,
      }

      return c.json({
        data: {
          ...task,
          project,
          assignee
        }
      })

    }
  )
  .post(
    '/',
    sessionMiddleware,
    zValidator('json', createTaskSchema),
    async (c) => {
      const user = c.get('user')
      const databases = c.get('databases')

      const { 
        name, 
        status, 
        workspaceId, 
        projectId, 
        dueDate,
        assigneeId,
        description
      } = c.req.valid('json')

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.equal('workspaceId', workspaceId),
          Query.orderAsc('position'),
          Query.limit(1)
        ]
      )

      const newPosition = highestPositionTask.documents.length > 0 ? highestPositionTask.documents[0].position + 1000 : 1000

      const task = await databases.createDocument(
          DATABASE_ID,
          TASKS_ID,
          ID.unique(),
          {
            name,
            status,
            workspaceId,
            projectId,
            dueDate,
            assigneeId,
            position: newPosition,
            description
          }
      )

       return c.json({ data: task })

    }
  )
  .post(
    "/bulk-update",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        tasks: z.array(
          z.object({
            $id: z.string(),
            status: z.nativeEnum(TaskStatus),
            position: z.number().int().positive().min(1000).max(1_000_000)
          })
        )
      })
    ), 
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user')
      const {tasks} = await c.req.valid("json")

      const tasksToUpdate = await databases.listDocuments<Task>(
        DATABASE_ID,
        TASKS_ID,
        [Query.contains("$id", tasks.map((task) => task.$id))]
      )

      const workspaceIds = new Set(tasksToUpdate.documents.map(task => task.workspaceId ))

      if(workspaceIds.size !== 1) {
        return c.json({error: "All tasks must benlogn to the same workspace"})
      }

      const workspaceId = workspaceIds.values().next().value as string
      
      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          const { $id, status, position } = task
          return databases.updateDocument<Task>(
            DATABASE_ID,
            TASKS_ID,
            $id,
            {status, position}
          )
        })
      )

      return c.json({data: updatedTasks})
    }
    
  )
  .delete(
    '/:taskId',
    sessionMiddleware,
    async (c) => {
      const user = c.get('user')
      const databases = c.get('databases')
      const { taskId } = c.req.param()
      
      const task = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId
      )

      const member = await getMember({
        databases,
        workspaceId: task.workspaceId,
        userId: user.$id
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      await databases.deleteDocument(
        DATABASE_ID,
        TASKS_ID,
        taskId
      )

      return c.json({ data: { $id: task.$id } })
    }
  )
  .patch(
    '/:taskId',
    sessionMiddleware,
    zValidator('json', createTaskSchema.partial()),
    async (c) => {
      const user = c.get('user')
      const databases = c.get('databases')

      const { 
        name, 
        status, 
        projectId, 
        dueDate,
        assigneeId,
        description
      } = c.req.valid('json')
      const { taskId } = c.req.param()

      const existingTask = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId
      )

      const member = await getMember({
        databases,
        workspaceId: existingTask.workspaceId,
        userId: user.$id
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      const task = await databases.updateDocument<Task>(
          DATABASE_ID,
          TASKS_ID,
          taskId,
          {
            name,
            status,
            projectId,
            dueDate,
            assigneeId,
            description
          }
      )

       return c.json({ data: task })

    }
  )


export default app