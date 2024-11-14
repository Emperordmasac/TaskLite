import z from 'zod'
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { zValidator } from '@hono/zod-validator';

import { getMember } from '@/features/members/lib/utils';
import { createTaskSchema } from '@/features/tasks/lib/schemas';

import { createAdminClient } from '@/lib/appwrite';
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { TaskStatus } from '../lib/types';
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
        console.log("🚀 ~ projectId:", projectId)
        query.push(Query.equal('projectId', projectId))
      }

      if ( asigneeId ) {
        console.log("🚀 ~ asigneeId:", asigneeId)
        query.push(Query.equal('assigneeId', asigneeId))
      }
 
      if ( status ) {
        console.log("🚀 ~ status:", status)
        query.push(Query.equal('status', status))
      }

      if ( search ) {
        console.log("🚀 ~ search:", search)
        query.push(Query.search('name', search))
      }

      if ( dueDate ) {
        console.log("🚀 ~ dueDate:", dueDate)
        query.push(Query.equal('dueDate', dueDate))
      }


      const tasks = await databases.listDocuments(
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
            name: user.name,
            email: user.email
          }
        })
      )

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find((project) => project.$id === task.projectId)

        const asignee = asignees.find((asignee) => asignee.$id === task.assigneeId)

        return {
          ...task,
          project,
          asignee
        }
      })

      return c.json({ data: {...tasks, populatedTasks} })
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

export default app