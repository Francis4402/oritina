"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { LoginSchema, loginSchemaValidation } from "./validation"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { signIn } from "next-auth/react"



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchemaValidation)
  });

  const {formState: {isSubmitting}} = form;

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      // const res = await signIn("credentials", {
      //   email: data.email,
      //   password: data.password,
      //   callbackUrl: "http://localhost:3000",
      //   redirect: false,
      // });

      // if (res?.ok) {
      //   toast.success("Login successful");
      //   form.reset();
      //   router.refresh();
      // } else {
      //   toast.error("Login failed");
      // }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    }
  };
  


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full">
        <CardContent>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Acme Inc account
                  </p>
                </div>
                <FormField control={form.control} name="email" render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} value={field.value || ''} placeholder="Enter Your Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} value={field.value || ''} placeholder="Enter Your Password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full">
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>

                <Link href={"/forgot-password"}>
                  <Button variant={"link"} size={"sm"}>
                    Forgot Password
                  </Button>
                </Link>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full" onClick={() => signIn("github", {
                    callbackUrl: "http://localhost:3000",
                  })}>
                    <FaGithub />
                  </Button>
                  <Button variant="outline" type="button" className="w-full" onClick={() => signIn("google", {
                    callbackUrl: "http://localhost:3000",
                  })}>
                    <FaGoogle/>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
