import { config } from 'dotenv'
config()

export const PORT: string = process.env.PORT
export const MONGODB_URI: string = process.env.MONGODB_URI
export const SECRET: string= process.env.SECRET
