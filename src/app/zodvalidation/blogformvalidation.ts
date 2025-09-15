import z from "zod";


export const blogValidationSchema = z.object({
    title: z.string().min(3).max(255, {
        message: "Please Enter Title"
    }),
    description: z.string().min(3).max(255, {
        message: "Please Enter Description"
    }),
    blogImage: z.string({
        message: "Please Enter Blog Image"
    }),
    category: z.string().min(2, {
        message: "Please Enter Category"
    }),
});


export type blogValidation = z.infer<typeof blogValidationSchema>;