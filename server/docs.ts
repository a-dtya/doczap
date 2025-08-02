"use server"

import { db } from "@/db/drizzle"
import {
  folders,
  documents,
  InsertFolder,
  InsertDocument,
} from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { and, eq } from "drizzle-orm"

/**
 * Folder CRUD (existing, lightly cleaned)
 */
export const createFolder = async (values: InsertFolder) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not found. Probably not logged in" }
    }

    await db.insert(folders).values({
      name: values.name,
      authorId: userId,
    })

    return { success: true, message: "Folder created successfully" }
  } catch (error) {
    console.log("Error @server/docs.ts createFolder", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const getFolders = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not found. Probably not logged in" }
    }

    const result = await db.select().from(folders).where(eq(folders.authorId, userId))
    return { success: true, message: "Folders fetched successfully", data: result }
  } catch (error) {
    console.log("Error @server/docs.ts getFolders", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const getFolderById = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not found. Probably not logged in" }
    }

    const result = await db
      .select()
      .from(folders)
      .where(and(eq(folders.id, id), eq(folders.authorId, userId)))

    return { success: true, message: "Folder fetched successfully", data: result[0] ?? null }
  } catch (error) {
    console.log("Error @server/docs.ts getFolderById", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const updateFolder = async (id: string, values: Partial<InsertFolder>) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not found. Probably not logged in" }
    }

    const result = await db
      .update(folders)
      .set(values)
      .where(and(eq(folders.id, id), eq(folders.authorId, userId)))

    return { success: true, message: "Folder updated successfully", data: result }
  } catch (error) {
    console.log("Error @server/docs.ts updateFolder", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const deleteFolderById = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not found. Probably not logged in" }
    }

    await db.delete(folders).where(and(eq(folders.id, id), eq(folders.authorId, userId)))
    return { success: true, message: "Folder deleted successfully" }
  } catch (error) {
    console.log("Error @server/docs.ts deleteFolderById", error)
    return { success: false, message: "Something went wrong" }
  }
}

/**
 * Document CRUD
 */
export const createDocument = async (values: InsertDocument) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not authenticated" }
    }

    const doc = await db.insert(documents).values({
      title: values.title,
      content: values.content,
      folderId: values.folderId,
      authorId: userId,
    })

    return { success: true, message: "Document created successfully", data: doc }
  } catch (error) {
    console.log("Error @server/docs.ts createDocument", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const getDocuments = async (folderId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not authenticated" }
    }

    const result = await db
      .select()
      .from(documents)
      .where(and(eq(documents.folderId, folderId), eq(documents.authorId, userId)))

    return { success: true, message: "Documents fetched", data: result }
  } catch (error) {
    console.log("Error @server/docs.ts getDocuments", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const getDocumentById = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not authenticated" }
    }

    const result = await db
      .select()
      .from(documents)
      .where(and(eq(documents.id, id), eq(documents.authorId, userId)))

    return { success: true, message: "Document fetched", data: result[0] ?? null }
  } catch (error) {
    console.log("Error @server/docs.ts getDocumentById", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const listDocumentsInFolder = async (folderId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not authenticated" }
    }

    const docs = await db
      .select()
      .from(documents)
      .where(and(eq(documents.folderId, folderId), eq(documents.authorId, userId)))

    return { success: true, message: "Documents fetched", data: docs }
  } catch (error) {
    console.log("Error @server/docs.ts listDocumentsInFolder", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const updateDocument = async (id: string, updates: Partial<InsertDocument>) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not authenticated" }
    }

    const result = await db
      .update(documents)
      .set({
        ...updates,
        updatedAt: new Date(),
      } as any)
      .where(and(eq(documents.id, id), eq(documents.authorId, userId)))

    return { success: true, message: "Document updated", data: result }
  } catch (error) {
    console.log("Error @server/docs.ts updateDocument", error)
    return { success: false, message: "Something went wrong" }
  }
}

export const deleteDocumentById = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id
    if (!userId) {
      return { success: false, message: "User not authenticated" }
    }

    await db.delete(documents).where(and(eq(documents.id, id), eq(documents.authorId, userId)))
    return { success: true, message: "Document deleted" }
  } catch (error) {
    console.log("Error @server/docs.ts deleteDocumentById", error)
    return { success: false, message: "Something went wrong" }
  }
}
