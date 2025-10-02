import { z } from "zod";

export const loginSchemaValidation = z.object({
    email: z.string(),
    password: z.string()
})

export const registerSchemaValidation = z.object({
    image: z.string().optional(),
    name: z.string().min(5).max(30, {
        message: "Name must be between 5 and 30 characters"
    }),
    email: z.string(),
    password: z.string(),
})


export type LoginSchema = z.infer<typeof loginSchemaValidation>;
export type RegisterSchema = z.infer<typeof registerSchemaValidation>;