"use server"

import {db} from "@/db/drizzle"
import {folders, documents} from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
export const createFolder = async (name: string) => {

    try{

        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if(!userId){
            return {success: false, message: "User not found. Probably not logged in"}
        }
        const folder = await db.insert(folders).values({
            name,
            authorId: userId
        })

        return {success: true, message: "Folder created successfully"}

    }catch(error){
        console.log("Error @server/docs.ts createFolder",error)
        return {success: false, message: "Something went wrong"}
    }
    
}
