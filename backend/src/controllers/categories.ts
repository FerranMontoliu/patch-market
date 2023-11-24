import { Router, type Response } from 'express'
import { Category } from '../models'
import { WebRequest } from '../types'
import { userExtractorMiddleware } from '../utils/middlewares'

export const categoriesRouter = Router()

categoriesRouter.get('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  try {
    const categories = await Category.find()
    response.json(categories)
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})