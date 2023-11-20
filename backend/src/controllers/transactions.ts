import { Router, Response } from 'express';
import Transaction from '../models/transaction';
import { WebRequest } from '../types';
import { userExtractorMiddleware } from '../utils/middlewares';
import { UserType } from '../models/user';
import { logInfo } from '../utils/logger';
import { Patch, Category } from '../models';

export const transactionsRouter = Router();

transactionsRouter.get('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const user: UserType = request.user;

  try {
    const tradeHistory = await Transaction
      .find({
        $or: [
          { to: user.id },
          { from: user.id },
        ],
      })
      .populate('to', { name: 1 })
      .populate('from', { name: 1 })
      .populate('patchTo', { title: 1 })
      .populate('patchesFrom', { title: 1 })
    response.json(tradeHistory);
  } catch (error) {
    console.error('Error fetching transactions:', error)
    response.status(500).json({ error: error.message || 'Internal server error' })
  }
});

transactionsRouter.get('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  try {
    const tradeHistoryId = await Transaction
      .findById(request.params.id)
      .populate('to', { name: 1 })
      .populate('from', { name: 1 })
      .populate('patchTo', { title: 1, owner: 1, name: 1, surname: 1, university: 1, image: 1, tradeable: 1, categories: 1, description: 1 })
      .populate('patchesFrom', { title: 1, owner: 1, name: 1, surname: 1, university: 1, image: 1, tradeable: 1, categories: 1, description: 1 })

    if (tradeHistoryId) {
      response.json(tradeHistoryId);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    response.status(500).json({ error: error.message || 'Internal server error' })
  }
});

transactionsRouter.post('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const { patchTo, patchesFrom, to } = request.body;
  const user: UserType = request.user;

  try {
    const newTransaction = new Transaction({
      patchTo,
      patchesFrom,
      from: user.id,
      to: to || '', 
      createDate: new Date(),
      lastUpdateDate: new Date(),
      status: 'pending',
    });

    const savedTransaction = await newTransaction.save();

    response.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    response.status(500).json({ error: error.message || 'Error creating transaction.' })
  }
})

transactionsRouter.put('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const { newStatus } = request.body;
  const id = request.params.id;
  try {
    const transaction = await Transaction
      .findByIdAndUpdate(id, { status: newStatus }, { new: true })
      .populate('patchTo')
      .populate('patchesFrom')
    if (!transaction) {
      response.status(404).json({ error: 'The transaction you are trying to update does not exist' })
      return
    }
    const { patchTo, patchesFrom } = transaction
    const newOwnerFrom = transaction.to 
    const newOwnerTo = transaction.from
    await Patch.findByIdAndUpdate(patchTo._id, { owner: newOwnerTo })
    for (const patchFrom of patchesFrom) {
      await Patch.findByIdAndUpdate(patchFrom._id, { owner: newOwnerFrom })
    }
    response.json(transaction)
    } catch (error) {
      response.status(500).json({ error: error.message || 'Internal server error' })
    }
  }
)
