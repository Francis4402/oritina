"use client"

import { categoryValidation, categoryValidationSchema } from '@/app/zodvalidation/categoryformvalidation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createProductCategory } from '@/services/ProductCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const AddCategoryForm = () => {

    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(categoryValidationSchema),
        defaultValues: {
            category: '',
        }
    });

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<categoryValidation> = async (data) => {
        try {
            const res = await createProductCategory(data);

            if (res) {
                toast.success("Category Added");
                setOpen(false);
                form.reset();
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
            <Button variant={"default"} size={"sm"}><Plus />Add Category</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className='flex items-center'>
                <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <FormField control={form.control} name="category" render={({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Input {...field} value={field.value || ""} placeholder='Enter Category' />
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

export default AddCategoryForm