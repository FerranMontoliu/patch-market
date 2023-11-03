import { Router, type Response } from 'express'
import Transaction from '../models/transaction'
import { WebRequest } from '../types'
import { userExtractorMiddleware } from '../utils/middlewares'
import { type UserType } from '../models/user'

export const transactionsRouter = Router()

transactionsRouter.get('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const user: UserType = request.user

  const transactions = await Transaction
    .find({
      $or: [
        { to: user.id, },
        { from: user.id, },
      ],
    })
    .populate('to', {
      name: 1,
    })
    .populate('from', {
      name: 1,
    })
    .populate('patchTo', {
      title: 1,
    })
    .populate('patchesFrom', {
      title: 1,
    })

  response.json(transactions)
})

transactionsRouter.get('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const patch = await Transaction
    .findById(request.params.id)
    .populate('to', {
      name: 1,
    })
    .populate('from', {
      name: 1,
    })
    .populate('patchTo', {
      title: 1,
    })
    .populate('patchesFrom', {
      title: 1,
    })

  if (patch) {
    response.json(patch)
  } else {
    response.status(404).end()
  }
})

// transactionsRouter.post('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
//   // TODO: CREATE TRANSACTION
// })

// transactionsRouter.put('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
//   // TODO: UPDATE TRANSACTION (CHANGE STATUS)
// })
