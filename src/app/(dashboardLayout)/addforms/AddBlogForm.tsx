"use client"

import { blogValidation, blogValidationSchema } from '@/app/zodvalidation/blogformvalidation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createBlog } from '@/services/Blog';
import { UploadButton } from '@/utils/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner';

const AddBlogForm = () => {
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(blogValidationSchema),
        defaultValues: {
            title: '',
            description: '',
            blogImage: '',
            blogtype: '',
        }
    });

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<blogValidation> = async (data) => {
        try {
            if (imageUrl) {
                data.blogImage = imageUrl;
            }

            const res = await createBlog(data);

            if (res) {
                toast.success("Blog Added");
                setOpen(false);
                form.reset();
                setImageUrl(null);
            } else {
                toast.error(res.error);
            }
        
        } catch (error) {
            console.log(error);   
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={"default"}><Plus />Add Blogs</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className='flex items-center'>
                <DialogTitle>Add Blogs</DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className="flex flex-col gap-4 items-center justify-center p-4 bg-muted/30 rounded-lg">
                        {imageUrl ? (
                            <div className="relative w-32 h-32 overflow-hidden border-2 border-primary rounded-md">
                            <img
                                src={imageUrl}
                                alt="Project preview"
                                className="object-cover w-full h-full"
                            />
                            </div>
                        ) : (
                            <div className="relative w-32 h-32 bg-muted flex items-center justify-center rounded-md border">
                            <span className="text-muted-foreground">No image</span>
                            </div>
                        )}

                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                            if (res?.[0]?.url) {
                                setImageUrl(res[0].url);
                                toast.success("Image uploaded");
                            }
                            }}
                            onUploadError={(error: Error) => {
                            toast.error(`Upload failed: ${error.message}`);
                            }}
                            appearance={{
                            button: "ut-ready:bg-blue-500 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md",
                            }}
                        />
                    </div>
                    <FormField control={form.control} name="title" render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <Input {...field} value={field.value || ""} placeholder='Enter title' />
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="description" render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <Textarea {...field} value={field.value || ""} placeholder='Enter description' />
                            <FormMessage />
                        </FormItem>
                    )} />

                    

                    <FormField control={form.control} name="blogtype" render={({field}) => (
                        <FormItem>
                            <FormLabel>Blog Type</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Blog Type" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="fashion">Fashion</SelectItem>
                                        <SelectItem value="lifestyle">LifeStyle</SelectItem>
                                        <SelectItem value="trends">Trends</SelectItem>
                                        <SelectItem value="sustainability">Sustainability</SelectItem>
                                    </SelectContent>
                                </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default AddBlogForm