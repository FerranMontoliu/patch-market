import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router, type Response } from 'express'
import User from '../models/user'
import { type WebRequest } from '../types'

export const loginRouter = Router()

loginRouter.post('/', async (request: WebRequest, response: Response): Promise<Response | void> => {
  const { email, password } = request.body

  const user = await User.findOne({ email })
  const passwordCorrect: boolean = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password.'
    })
  }

  const { _id: id, name, surname, telegramUser } = user

  const userIdForToken = {
    id,
  }

  // Token expires in 60*60 seconds (1h)
  const token: string = sign(
    userIdForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  response
    .status(200)
    .send({
      token,
      name,
      surname,
      email,
      telegramUser,
    })
})
