import dotenv from "dotenv";
import { z } from "zod";
//load eniroment variables from env file
dotenv.config();

const envSchema = z.object({
   DATABASE_URL : z.string().min(1, "DATABASE_URL is required"),
   //PORT : z.coerce.number().optional().default(3001),
   NODE_ENV: z.enum(["development", "production", "test"]).default("production"),

   
})

const parseEnv = () => {
    const result = envSchema.safeParse(process.env)

    if (!result.success) {
        console.error("Invalid environment variables:", z.treeifyError(result.error))
        process.exit(1)
    }
    return result.data
}

export const env = parseEnv()
export type Env = z.infer<typeof envSchema>

