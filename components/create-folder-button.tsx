"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { createFolder } from "@/server/docs"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
const formSchema = z.object({
    name: z.string().min(3),
})

export default function CreateFolderButton(){
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      })
    
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            const session = await authClient.getSession()
            const userId = session?.data?.user?.id
            if(!userId){
                toast.error("User not found. Probably not logged in")
                return
            }
            const response = await createFolder({name: values.name, authorId: userId})
            if(response.success){
                toast.success("Folder created successfully")
                router.refresh()
            }
            else{
                toast.error("Something went wrong")
            }
        }
        catch(error){
            console.log("Error @components/create-folder-button.ts onSubmit",error)
            toast.error("Something went wrong")
        }
    }
    return <Dialog>
    <DialogTrigger asChild>
        <Button variant="outline" className="w-max">Create Folder</Button>
    </DialogTrigger>
    <DialogContent>
    <DialogHeader>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogDescription>
          Create a new folder
        </DialogDescription>
      </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Folder Name</FormLabel>
              <FormControl>
                <Input placeholder="Folder Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your folder name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create
        </Button>
      </form>
    </Form>
    </DialogContent>
  </Dialog>
}