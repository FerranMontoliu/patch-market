import { Request } from 'express'
import { UserType } from '../models/user'

export type WebError = Error & { status?: number };
export type WebRequest = Request & { token?: string; user?: UserType; };
