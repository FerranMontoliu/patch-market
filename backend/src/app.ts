import express, { type Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {
  errorHandlerMiddleware,
  requestLoggerMiddleware,
  tokenExtractorMiddleware,
  unknownEndpointMiddleware
} from './utils/middlewares'
import { logError, logInfo } from './utils/logger'
import { MONGODB_URI } from './utils/config'
import { loginRouter } from './controllers/login'
import { usersRouter } from './controllers/users'
import { patchesRouter } from './controllers/patches'
import { transactionsRouter } from './controllers/transactions'

require('express-async-errors')

export const app: Express = express()

mongoose.set('debug', true)
mongoose.set('strictQuery', false)

logInfo('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then((): void => {
    logInfo('Connected to MongoDB.')
  })
  .catch((error): void => {
    logError('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLoggerMiddleware)
app.use(tokenExtractorMiddleware)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/patches', patchesRouter)
app.use('/api/transactions', transactionsRouter)

app.use(unknownEndpointMiddleware)
app.use(errorHandlerMiddleware)
