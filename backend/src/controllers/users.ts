import bcrypt from 'bcrypt'
import { Router, Response } from 'express'
import User from '../models/user'
import { type WebRequest } from '../types'

export const usersRouter = Router()

usersRouter.post('/', async (request: WebRequest, response: Response): Promise<void> => {
  const { name, surname, email, telegramUser, password } = request.body

  if (!name || !surname || !email || !telegramUser || !password) {
    response.status(400).json({ error: 'Missing required fields.' })
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    response.status(400).json({ error: 'Invalid email format.' })
    return
  }
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    response.status(400).json({ error: 'Email is already in use.' })
    return
  }

  const saltRounds: number = 10
  const passwordHash: string = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    surname,
    email,
    telegramUser,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(500).json({ error: 'Error creating user.' })
  }
})
