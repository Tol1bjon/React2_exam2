import { z } from "zod";

export const Schemas = z.object({
    name: z.string(),
    avatar: z.string(),
    age: z.coerce.number(),
    email: z.string().email(),
    job: z.string(),
    status: z.preprocess((val) => val == "true" || val == true, z.boolean())
})