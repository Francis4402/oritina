"use client"


import { category } from '@/app/types/Types'
import { ProductValidation, productValidationSchema } from '@/app/zodvalidation/productformvalidation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createProduct } from '@/services/Product'
import { getProductCategory } from '@/services/ProductCategory'
import { UploadButton } from '@/utils/uploadthing'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'


const AddProductForm = () => {
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [category, setCategory] = useState<category[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizeOptions = ["M", "L", "XL", "2XL"];

  useEffect(() => {
    getProductCategory().then(res => {
      setCategory(res);
    });
  }, []);

  const form = useForm<ProductValidation>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      name: '',
      productImage: [],
      description: '',
      producttype: '',
      color: [''],
      price: 0,
      size: [],
      category: '',
      spcefication: [''],
    }
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit: SubmitHandler<ProductValidation> = async (data) => {
    try {
      if (imageUrls.length > 0) {
        data.productImage = imageUrls;
      }

      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        productImage: imageUrls,
        category: data.category,
        size: selectedSizes,
        spcefication: data.spcefication.filter(spec => spec.trim() !== ''),
        producttype: data.producttype,
        color: data.color.filter(color => color.trim() !== ''),
        totalRating: "0",
        reviews: "0"
      };

      const res = await createProduct(productData);

      if (res) {
        toast.success("Product Added Successfully");
        setOpen(false);
        setImageUrls([]);
        setSelectedSizes([]);
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

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => {
      if (prev.includes(size)) {
        return prev.filter(s => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  useEffect(() => {
    form.setValue('size', selectedSizes as ("M" | "L" | "XL" | "2XL")[]);
  }, [selectedSizes, form]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}><Plus />Add Product</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className='flex items-center'>
          <DialogTitle>Add Product</DialogTitle>
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

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} placeholder='Enter Product Name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value || ""} placeholder='Enter Description' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number"
                    value={field.value || ""} 
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)} 
                    placeholder='Enter Price' 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name='producttype' render={({field}) => (
              <FormItem>
                <FormLabel>Product Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className='w-full'>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product Type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="newarrivals">New Arrivals</SelectItem>
                    <SelectItem value="bestsellers">Best Sellers</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name='size' render={() => (
              <FormItem>
                <FormLabel>Product Size</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      onClick={() => handleSizeToggle(size)}
                      className="rounded-md"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className='w-full'>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category.map((item: category) => (
                      <SelectItem key={item?.id} value={item?.category}>
                        {item?.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            {/*Dynamic Spcefication */}
            <FormField control={form.control} name="spcefication" render={({field}) => (
              <FormItem>
                <FormLabel>Detailed Specification</FormLabel>
                <div className='space-y-3'>
                  {field.value.map((spec, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <FormControl>
                        <Input value={spec} onChange={(e) => {
                          const newSpec = [...field.value];
                          newSpec[index] = e.target.value;
                          field.onChange(newSpec);
                        }} placeholder='Enter Specefication' className='flex-1' />
                      </FormControl>
                      {field.value.length > 1 && (
                        <Button type='button' variant={'destructive'} size={'icon'} onClick={() => {
                          const newSpec = field.value.filter((_, i) => i !== index);
                          field.onChange(newSpec);
                        }}>
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => field.onChange([...field.value, ''])}
                      className="mt-2"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Spec
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )} />

            {/* Dynamic Color Inputs */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <div className="space-y-3">
                    {field.value.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            value={color}
                            onChange={(e) => {
                              const newColors = [...field.value];
                              newColors[index] = e.target.value;
                              field.onChange(newColors);
                            }}
                            placeholder={`Color ${index + 1}`}
                            className="flex-1"
                          />
                        </FormControl>
                        {field.value.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const newColors = field.value.filter((_, i) => i !== index);
                              field.onChange(newColors);
                            }}
                            className="h-10 w-10"
                          >
                            <X size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => field.onChange([...field.value, ''])}
                      className="mt-2"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Color
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductForm