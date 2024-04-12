import z from "zod";

// For Backend
export const signupInput= z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signinInput= z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const createBlogInput= z.object({
    title: z.string(),
    content: z.string(),
});

export const updateBlogInput= z.object({
    title: z.string(),
    content: z.string(),
});


// type Inference in zod , so that even Front-End can have access to it
export type SignupInput= z.infer<typeof signupInput>;
export type SigninInput= z.infer<typeof signinInput>;
export type CreateBlogInput= z.infer<typeof createBlogInput>;
export type UpdateBlogInput= z.infer<typeof updateBlogInput>;

