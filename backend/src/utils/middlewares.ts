import { type NextFunction, type Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { logInfo, logError } from './logger'
import { NODE_ENV, SECRET } from './config'
import User from '../models/user'
import { type WebRequest, type WebError } from '../types'

export const requestLoggerMiddleware = (request: WebRequest, response: Response, next: NextFunction): void => {
  logInfo('Method:', request.method)
  logInfo('Path:', request.path)

  if (NODE_ENV !== 'production') {
    logInfo('Body:', request.body)
  }

  logInfo('---')

  next()
}

export const tokenExtractorMiddleware = (request: WebRequest, response: Response, next: NextFunction): void => {
  const authorization: string = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

export const userExtractorMiddleware = async (request: WebRequest, response: Response, next: NextFunction): Promise<Response | void> => {
  if (request.token === undefined) {
    return response.status(401).json({ error: 'No token provided.' })
  }

  try {
    const decodedToken = verify(request.token, SECRET) as JwtPayload
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token.' })
    }

    const user = await User.findById(decodedToken.id)

    if (user) {
      request.user = user
    } else {
      return response.status(401).json({ error: 'Expired token.' })
    }
  } catch (e) {
    return response.status(401).json({ error: 'Expired token.' })
  }

  next()
}

export const unknownEndpointMiddleware = (request: WebRequest, response: Response): void => {
  response.status(404).send({ error: 'Unknown endpoint.' })
}

export const errorHandlerMiddleware = (error: WebError, request: WebRequest, response: Response, next: NextFunction): Response | void => {
  logError(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id.' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Token expired.'
    })
  }

  next(error)
}
