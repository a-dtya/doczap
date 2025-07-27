"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInWithEmail } from "@/server/users"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading,setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try{
      setLoading(true)
      const response = await signInWithEmail(values.email,values.password)
      if(response.success){
        setLoading(false)
        toast.success(response.message)
      }
      else{
        setLoading(false)
        toast.error(response.message)
      }
    }
    catch(error){
      console.log("Error @components/login-form.ts onSubmit",error)
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
      
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div className="grid gap-3">
                  
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="min 8 characters" {...field} />
                      </FormControl>
                      <div className="flex items-center">
                      <FormDescription>
                        Enter your password
                      </FormDescription>
                      <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</a>  
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
                </Button>
                
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
            </form>
        </CardContent>
      </Card>
      </Form>
    </div>
  )
}
