import z from "zod";


export const commentValidation = z.object({
    comment: z.string().min(1, "Comment is required").max(500, "Comment is too long"),
});

export type CommentValid = z.infer<typeof commentValidation>;