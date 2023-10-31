import bcrypt from 'bcrypt'
import { Router, type Response } from 'express'
import { User } from '../models/user'
import { type WebRequest } from '../utils/types'

export const usersRouter = Router()

usersRouter.post('/', async (request: WebRequest, response: Response): Promise<void> => {
  const { name, surname, email, telegramUser, password } = request.body

  // TODO: VALIDATE DATA

  const saltRounds: number = 10
  const passwordHash: string = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    surname,
    email,
    telegramUser,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})
