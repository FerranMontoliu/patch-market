import { Router, type Response } from 'express'
import { University } from '../models'
import { WebRequest } from '../types'
import { userExtractorMiddleware } from '../utils/middlewares'

export const universitiesRouter = Router()

universitiesRouter.get('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  try {
    const universities = await University.find().sort({ name: 'asc' })
    response.json(universities)
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})