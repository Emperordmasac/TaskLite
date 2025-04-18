
import { Hono } from 'hono'
import { ID } from 'node-appwrite'
import { deleteCookie, setCookie } from 'hono/cookie'
import { zValidator } from '@hono/zod-validator'

import { createAdminClient } from '@/lib/appwrite'
import { sessionMiddleware } from '@/lib/session-middleware'

import { AUTH_COOKIE } from '@/features/auth/lib/constants'
import { signInSchema, signUpSchema } from '@/features/auth/lib/schema'

const app = new Hono()
  .get(
    '/current', 
    sessionMiddleware, 
    (c) => {
      const user = c.get('user')

      return c.json({ data: user })
    }
  )
  .post(
    '/login', 
    zValidator("json", signInSchema), 
    async (c) => {
      const { email, password } = c.req.valid('json')

      const { account } = await createAdminClient()
      const session = await account.createEmailPasswordSession(email, password)

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30
      })

      return c.json({ success: true })
    }  
  )
  .post(
    '/register', 
    zValidator("json", signUpSchema),
    async (c) => {
      const { email, password, name } = c.req.valid('json')
      
      const { account } = await createAdminClient()
      await account.create(ID.unique(), email, password, name)

      const session = await account.createEmailPasswordSession(email, password)

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30
      })

      return c.json({ success: true })
    }
  )
  .post(
    '/logout', sessionMiddleware, async (c) => {
      const account = c.get('account')

      deleteCookie(c, AUTH_COOKIE)

      await account.deleteSession('current')

      return c.json({ success: true })
    }
  )

export default app