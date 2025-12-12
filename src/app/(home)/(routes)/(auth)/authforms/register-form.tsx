/* eslint-disable @next/next/no-img-element */
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RegisterSchema, registerSchemaValidation } from "./validation"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { register } from "@/services/authservices/authservices"
import { signIn } from "next-auth/react"
import { UploadButton } from "@/utils/uploadthing"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchemaValidation),
  });

  const {formState: {isSubmitting}} = form;

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
        if (imageUrl) {
          data.image = imageUrl;
        }

        const result = await register(data);
        
        if (result?.success) {
            toast.success(result.message || "Registered successfully");
            form.reset();
            setImageUrl(null);

            const login = await signIn("credentials", {
              email: data.email,
              password: data.password,
              callbackUrl: "https://oritina.vercel.app",
              redirect: false,
            });

            if (login?.ok) {
              toast.success("Login successful");
              form.reset();
              router.refresh();
            } else {
              toast.error("Login failed");
            }
        } else {
            toast.error(result?.error || result?.message || "Registration failed");
        }
    } catch (error) {
        console.error("Registration submission error:", error);
        toast.error(error instanceof Error ? error.message : "Registration failed");
    }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Register</h1>
                  <p className="text-muted-foreground text-balance">
                    Register to your Acme Inc account
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  
                {imageUrl ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                      <img
                        src={imageUrl}
                        alt="Profile preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}

                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.url) {
                        setImageUrl(res[0].url);
                        form.setValue("image", res[0].url);
                        toast.success("Image uploaded");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    appearance={{
                      button: "ut-ready:bg-primary ut-uploading:cursor-not-allowed bg-blue-500 p-4 text-white",
                      allowedContent: "hidden",
                    }}
                  />
                </div>

                <FormField control={form.control} name="name" render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ''} placeholder="Enter Your Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
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
                  {isSubmitting ? "Loading..." : "Register"}
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full" onClick={() => signIn("github", {
                    callbackUrl: "https://oritina.vercel.app",
                  })}>
                    <FaGithub />
                  </Button>
                  <Button variant="outline" type="button" className="w-full" onClick={() => signIn("google", {
                    callbackUrl: "https://oritina.vercel.app",
                  })}>
                    <FaGoogle />
                  </Button>
                </div>
                <div className="text-center text-sm">
                  already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Sign in
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
