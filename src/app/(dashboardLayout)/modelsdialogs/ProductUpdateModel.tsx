"use client"

import { category, product } from '@/app/types/Types'
import { ProductValidation, productValidationSchema } from '@/app/zodvalidation/productformvalidation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { updateProduct } from '@/services/Product'
import { getProductCategory } from '@/services/ProductCategory'
import { UploadButton } from '@/utils/uploadthing'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'


const UpdateProductModel = ({product}: {product: product}) => {
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getProductCategory().then(res => {
      setCategory(res);
    });
  },[]);


  const form = useForm({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      name: product.name,
      productImage: product.productImage,
      description: product.description,
      price: product.price,
      color: product.color,
      category: product.category,
    }
  });
  
  const {formState: {isSubmitting}} = form;

  const onSubmit: SubmitHandler<ProductValidation> = async (data) => {
    try {
      if (imageUrls) {
        data.productImage = imageUrls;
      }

      const res = await updateProduct({
        id: product.id,
        ...data
      });

      if (res) {
        toast.success("Product Added");
        setOpen(false);
        setImageUrls([]);
        form.reset();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeImage = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={"default"} size={"sm"}><Plus />Update Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className='flex items-center'>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                  <div className="flex flex-col gap-4 items-center justify-center p-4 bg-muted/30 rounded-lg">

                    {imageUrls.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative w-full h-32 overflow-hidden border-2 border-primary rounded-md group">
                            <img
                              src={url}
                              alt={`Product preview ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative w-32 h-32 bg-muted flex items-center justify-center rounded-md border">
                        <span className="text-muted-foreground">No images</span>
                      </div>
                    )}

                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                          const newUrls = res.map(file => file.url);
                          setImageUrls(prev => [...prev, ...newUrls]);
                          toast.success(`${res.length} image(s) uploaded`);
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
                    <FormField control={form.control} name="name" render={({field}) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <Input {...field} value={field.value || ""} placeholder='Enter Product Name' />
                        <FormMessage /> 
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="description" render={({field}) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <Textarea {...field} value={field.value || ""} placeholder='Enter Description' />
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="price" render={({field}) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <Input {...field} value={field.value || ""} onChange={(e) => field.onChange(Number(e.target.value) || 0)} placeholder='Enter Price' />
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="category" render={({field}) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {
                              category.map((item: category) => (
                                <SelectItem key={item?.id} value={item?.category}>
                                  {item?.category}
                                </SelectItem>
                              ))
                            }
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

export default UpdateProductModel