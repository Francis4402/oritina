/* eslint-disable @next/next/no-img-element */
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RegisterSchema, registerSchemaValidation } from "./validation"
import { FaGithub } from "react-icons/fa"


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
        // if (imageUrl) {
        //   data.image = imageUrl;
        // }

        // const result = await register(data);
        
        // if (result?.success) {
        //     toast.success(result.message || "Registered successfully");
        //     form.reset();
        //     setImageUrl(null);

        //     const login = await signIn("credentials", {
        //       email: data.email,
        //       password: data.password,
        //       callbackUrl: "http://localhost:3000",
        //       redirect: false,
        //     });

        //     if (login?.ok) {
        //       toast.success("Login successful");
        //       form.reset();
        //       router.refresh();
        //     } else {
        //       toast.error("Login failed");
        //     }
        // } else {
        //     toast.error(result?.error || result?.message || "Registration failed");
        // }
    } catch (error) {
        console.error("Registration submission error:", error);
        toast.error(error instanceof Error ? error.message : "Registration failed");
    }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Register</h1>
                  <p className="text-muted-foreground text-balance">
                    Register to your Acme Inc account
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  
                {/* {imageUrl ? (
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
                      button: "ut-ready:bg-primary ut-uploading:cursor-not-allowed bg-primary/90 text-white",
                      allowedContent: "hidden",
                    }}
                  /> */}
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

                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <FaGithub />
                    <span className="sr-only">Login with Github</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
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
          <div className="bg-muted relative">
            {/* <Image
              src="/im.jpg"
              alt="Image"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover"
            /> */}
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
