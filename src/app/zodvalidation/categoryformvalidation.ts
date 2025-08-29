import z from "zod";


export const categoryValidationSchema = z.object({
    category: z.string().min(3).max(255, {
        message: "Please Enter Category"
    }),
});

export type categoryValidation = z.infer<typeof categoryValidationSchema>;