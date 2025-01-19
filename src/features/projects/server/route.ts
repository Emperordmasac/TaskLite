import { z } from 'zod'
import { Hono } from 'hono'
import { ID, Query } from 'node-appwrite'
import { zValidator } from '@hono/zod-validator'

import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID, TASKS_ID } from '@/config'
import { getMember } from '@/features/members/lib/utils'
import { sessionMiddleware } from '@/lib/session-middleware'
import { createProjectSchema, updateProjectSchema } from '../lib/schema'
import { Project } from '../lib/types'

import {endOfMonth, startOfMonth, subMonths} from 'date-fns'
import { TaskStatus } from '@/features/tasks/lib/types'

const app = new Hono() 
  .get(
    '/', 
    sessionMiddleware,  
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
    const user = c.get('user')
    const databases = c.get('databases')

    const { workspaceId } = c.req.valid('query')

    if(!workspaceId ) {
      return c.json({error: 'Workspce not found'}, 400)
    }

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id
     })

    if(!member ) {
      return c.json({error: 'Unauthorized'}, 401)
    }

    const projects = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_ID,
      [
        Query.equal('workspaceId', workspaceId),
        Query.orderDesc('$createdAt')
      ],
    )

    return c.json({ data: projects })
  })
  .get(
    '/:projectId',
    sessionMiddleware,
    async (c) => {
      const user = c.get('user')
      const databases = c.get('databases')
      const {projectId} = c.req.param();

      const project = await databases.getDocument<Project>(DATABASE_ID, PROJECTS_ID, projectId)
      const member = await getMember({
        databases, 
        workspaceId: project.workspaceId, 
        userId: user.$id
      })

      if(!member) {
        return c.json({ error: 'Unathorized' }, 400)
      }

      return c.json({ data: project})
    }
  )
  .post(
    '/',
    sessionMiddleware,
    zValidator('form', createProjectSchema),
    async (c) => {
      const user = c.get('user')
      const storage = c.get('storage')
      const databases = c.get('databases')

      const { name, image, workspaceId } = c.req.valid('form')

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      let uploadedImageUrl: string | undefined

      if (image instanceof File ) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID, 
          ID.unique(), 
          image
        )

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID, 
          file.$id
        )

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`
      }

      const projects = await databases.createDocument(
        DATABASE_ID, 
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          imageUrl: uploadedImageUrl,
          workspaceId
        }
      )

      return c.json({ data: projects })
    }
  )
  .patch(
    '/:projectId', 
    sessionMiddleware, 
    zValidator('form', updateProjectSchema), 
    async (c) => {
      const databases = c.get('databases')
      const storage = c.get('storage')
      const user = c.get('user')

      const { projectId } = c.req.param()
      const { name, image } = c.req.valid('form')

      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      )

      const member = await getMember({
        databases, 
        workspaceId: existingProject.workspaceId,
        userId: user.$id
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      let uploadedImageUrl: string | undefined

      if (image instanceof File ) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID, 
          ID.unique(), 
          image
        )

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID, 
          file.$id
        )

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`
      } else {
        uploadedImageUrl = image
      }

      const project = await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_ID,
        projectId,
        {
          name,
          imageUrl: uploadedImageUrl
        }
      )
      
      return c.json({data: project})
  })
  .delete(
    "/:projectId", 
    sessionMiddleware, 
    async (c) => {
      const databases = c.get('databases')
      const user = c.get('user')
    
      const { projectId } = c.req.param()

      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      )

      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id
      })

    if (!member) {
      return c.json({error: 'Unauthorized'}, 401)
    }
          
        // TODO: DELETE TASKS

    await databases.deleteDocument(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    )

     return c.json({data: {$id: existingProject.$id}})
  })
  .get(
    '/:projectId/analytics',
    sessionMiddleware,
    async (c) => {
      const { projectId } = c.req.param()

      const databases = c.get('databases')
      const user = c.get('user')

      const project = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      )

      const member = await getMember({
        databases,
        workspaceId: project.workspaceId,
        userId: user.$id
      })

      if(!member) {
        return c.json({error: 'Unauthorized'}, 401)
      }

      const now = new Date() 
      const thisMonthStart = startOfMonth(now)
      const thisMonthEnd = endOfMonth(now)

      const lastMonthStart = startOfMonth(subMonths(now, 1))
      const lastMonthEnd = endOfMonth(subMonths(now, 1))

      const thisMonthTasks = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString())
        ]
      )

      const lastMonthTasks = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString())
        ]
      )

      const taskCount = thisMonthTasks.total;
      const taskDifference = taskCount - lastMonthTasks.total;

      const thisMonthAssignedTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.equal('assigneeId', member.$id),
          Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString())
        ]
      )

      const lastMonthAssignedTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.equal('assigneeId', member.$id),
          Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString())
        ]
      )

      const assignedTaskCount = thisMonthAssignedTask.total;
      const assignedTaskDifference = assignedTaskCount - lastMonthAssignedTask.total;

      const thisMonthInCompleteTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.notEqual('status', TaskStatus.DONE),
          Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString())
        ]
      )
      
      const lastMonthInCompleteTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.notEqual('status', TaskStatus.DONE),
          Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString())
        ]
      )

      const inCompleteTaskCount = thisMonthInCompleteTask.total;
      const inCompleteTaskDifference = inCompleteTaskCount - lastMonthInCompleteTask.total;

      const thisMonthCompletedTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.equal('status', TaskStatus.DONE),
          Query.greaterThanEqual('$createdAt', thisMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', thisMonthEnd.toISOString())
        ]
      )

      const lastMonthCompletedTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.equal('status', TaskStatus.DONE),
          Query.greaterThanEqual('$createdAt', lastMonthStart.toISOString()),
          Query.lessThanEqual('$createdAt', lastMonthEnd.toISOString())
        ]
      )

      const completedTaskCount = thisMonthCompletedTask.total;
      const completedTaskDifference = completedTaskCount - lastMonthCompletedTask.total;

      const thisMonthOverdueTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.notEqual('status', TaskStatus.DONE),
          Query.lessThan('dueDate', now.toISOString()),
          Query.greaterThanEqual('dueDate', lastMonthStart.toISOString()),
          Query.lessThanEqual('dueDate', lastMonthEnd.toISOString())
        ]
      )

      const lastMonthOverdueTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal('projectId', projectId),
          Query.notEqual('status', TaskStatus.DONE),
          Query.lessThan('dueDate', now.toISOString()),
          Query.greaterThanEqual('dueDate', lastMonthStart.toISOString()),
          Query.lessThanEqual('dueDate', lastMonthEnd.toISOString())
        ]
      )

      const overdueTaskCount = thisMonthOverdueTask.total;
      const overdueTaskDifference = overdueTaskCount - lastMonthOverdueTask.total;

      return c.json({
        data: {
          taskCount,
          taskDifference,
          assignedTaskCount,
          assignedTaskDifference,
          inCompleteTaskCount,
          inCompleteTaskDifference,
          completedTaskCount,
          completedTaskDifference,
          overdueTaskCount,
          overdueTaskDifference
        }
      })
    }
  )

export default app