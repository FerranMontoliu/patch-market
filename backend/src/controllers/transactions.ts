import { Router, Response } from 'express' // Corrected import statement
import Transaction from '../models/transaction'
import { WebRequest } from '../types'
import { userExtractorMiddleware } from '../utils/middlewares'
import { UserType } from '../models/user' // Removed "type" keyword
export const transactionsRouter = Router()

transactionsRouter.get('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const user: UserType = request.user

  try {
    const tradeHistory = await Transaction
      .find({
        $or: [
          { to: user.id },
          { from: user.id },
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
    response.json(tradeHistory)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    response.status(500).json({ error: 'Internal server error' })
  }
})

transactionsRouter.get('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  try {
    const tradeHistoryId = await Transaction
      .findById(request.params.id)
      .populate('to', {
        name: 1,
      })
      .populate('from', {
        name: 1,
      })
      .populate('patchTo', {
        title: 1,
        owner: 1,
        name: 1,
        surname: 1,
        university: 1,
        image: 1,
        isTradeable: 1,
        categories: 1,
        description: 1,
      })
      .populate('patchesFrom', {
        title: 1,
        owner: 1,
        name: 1,
        surname: 1,
        university: 1,
        image: 1,
        isTradeable: 1,
        categories: 1,
        description: 1,
      })
    if (tradeHistoryId) {
      response.json(tradeHistoryId)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    console.error('Error fetching transaction by ID:', error)
    response.status(500).json({ error: 'Internal server error' })
  }
})



// transactionsRouter.post('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
//   // TODO: CREATE TRANSACTION
// })

transactionsRouter.put('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const { newStatus } = request.body
  const id = request.params.id

  const updatedTransaction = await Transaction
    .findByIdAndUpdate(id, { status: newStatus }, { new: true })

  if (updatedTransaction) {
    response.json(updatedTransaction)
  } else {
    response.status(404).json({ error: 'The transaction you are trying to update does not exist' }).end()
  }
})
