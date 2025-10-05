import z from "zod";

export const contactusValidationSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    phone: z.string(),
    message: z.string().min(2).max(255),
});

export type contactusValidation = z.infer<typeof contactusValidationSchema>;