import { z } from "zod";

export const Schemas = z.object({
    name: z.string().min(2, "Не менее 2 символов"),
    avatar: z.string(),
    age: z.coerce.number().min(18, "Не менее 18 лет"),
    email: z.string().email("Неверная почта"),
    job: z.string().min(2, "Не менее 2 символов"),
    status: z.preprocess((val) => val == "true" || val == true, z.boolean())
})