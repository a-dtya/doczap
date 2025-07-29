"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInWithEmail } from "@/server/users"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
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
        router.push('/dashboard')
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
          <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">Login to your account</CardTitle>
          <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
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
                    <FormLabel className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input className="text-xs md:text-sm" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
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
                      <FormLabel className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Password</FormLabel>
                      <FormControl>
                        <Input className="text-xs md:text-sm" type="password" placeholder="min 8 characters" {...field} />
                      </FormControl>
                      <div className="flex items-center">
                      <FormDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        Enter your password
                      </FormDescription>
                      <a href="#" className="ml-auto inline-block text-xs md:text-sm underline-offset-4 hover:underline">Forgot your password?</a>  
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-[60%] md:w-full mx-auto" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span className="text-xs md:text-sm">Login</span>}
                </Button>
                
              </div>
            </div>
            <div className="mt-4 text-center text-xs md:text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4 text-xs md:text-sm">
                Sign up
              </Link>
            </div>
            </form>
        </CardContent>
      </Card>
      </Form>
    </div>
  )
}
