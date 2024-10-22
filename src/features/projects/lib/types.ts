import { Models } from 'node-appwrite';

export type Project = Models.Document & {
  name: string
  imgeUrl: string
  workspaceId: string
}