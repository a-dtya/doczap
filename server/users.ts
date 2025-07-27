"use server"

import { auth } from "@/lib/auth";
export const signInWithEmail = async(email:string,password:string)=>{

    try{
        const response = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        });

        return {success:true,message:"User signed in successfully"}
    }catch(error){
        console.log("Error @server/users.ts signInWithEmail",error)
        return {success:false,message:"Invalid Email or Password"}
    }   
}

export const signUpWithEmail = async(email:string,password:string,name:string)=>{
    try{
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name
            }
        });

        return {success:true,message:"User created and signed in successfully"}
    }catch(error){
        console.log("Error @server/users.ts signUpWithEmail",error)
        return {success:false,message:"Something went wrong"}
    }   
}
    