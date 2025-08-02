"use server"

import {db} from "@/db/drizzle"
import {folders, documents, InsertFolder} from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq } from "drizzle-orm"
export const createFolder = async (values: InsertFolder) => {

    try{

        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if(!userId){
            return {success: false, message: "User not found. Probably not logged in"}
        }
        const folder = await db.insert(folders).values({
            name: values.name,
            authorId: userId
        })

        return {success: true, message: "Folder created successfully"}

    }catch(error){
        console.log("Error @server/docs.ts createFolder",error)
        return {success: false, message: "Something went wrong"}
    }
    
}

export const getFolders = async () => {
    try{
        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if(!userId){
            return {success: false, message: "User not found. Probably not logged in"}
        }
        const result = await db.select().from(folders).where(eq(folders.authorId, userId))
        return {success: true, message: "Folders fetched successfully", data: result}
    }catch(error){
        console.log("Error @server/docs.ts getFolders",error)
        return {success: false, message: "Something went wrong"}
    }
} 

export const getFolderById = async (id: string) => {
    try{
        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if(!userId){
            return {success: false, message: "User not found. Probably not logged in"}
        }
        const result = await db.select().from(folders).where(eq(folders.id, id))
        return {success: true, message: "Folder fetched successfully", data: result}
    }catch(error){
        console.log("Error @server/docs.ts getFolderById",error)
        return {success: false, message: "Something went wrong"}
    }
}

export const updateFolder = async (id: string, values: InsertFolder) => {
    try{
        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if(!userId){
            return {success: false, message: "User not found. Probably not logged in"}
        }
        const result = await db.update(folders).set(values).where(eq(folders.id, id))
        return {success: true, message: "Folder updated successfully", data: result}
    }catch(error){
        console.log("Error @server/docs.ts updateFolder",error)
        return {success: false, message: "Something went wrong"}
    }
}

export const deleteFolderById = async (id: string) => {
    try{
        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if(!userId){
            return {success: false, message: "User not found. Probably not logged in"}
        }
        const result = await db.delete(folders).where(eq(folders.id, id))
        return {success: true, message: "Folder deleted successfully", data: result}
    }catch(error){
        console.log("Error @server/docs.ts deleteFolderById",error)
        return {success: false, message: "Something went wrong"}
    }
}
