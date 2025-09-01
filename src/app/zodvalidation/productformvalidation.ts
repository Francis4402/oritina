import z from "zod";


export const productValidationSchema = z.object({
    name: z.string().min(3).max(255, {
        message: "Please Enter Product Name"
    }),
    
    productImage: z.array(z.string({
        message: "Please Enter Product Image"
    })),

    producttype: z.string().min(3).max(255, {
        message: "Please Enter Product Type"
    }),

    description: z.string().min(3).max(255, {
        message: "Please Enter Product Description"
    }),

    spcefication: z.array(z.string({
        message: "Please Enter Specefication"
    })),
    
    color: z.array(z.string({
        message: "Please Enter Color"
    })),

    price: z.number(),

    size: z.array(z.enum(["M", "L", "XL", "2XL"])),

    category: z.string().min(3).max(255, {
        message: "Please Enter Category"
    }),

    totalRating: z.string().min(3).max(255, {
        message: "Please Enter Total Rating"
    }).optional(),

    reviews: z.string().min(3).max(255, {
        message: "Please Enter Reviews"
    }).optional(),
});

export type ProductValidation = z.infer<typeof productValidationSchema>;