import { Router, Response } from 'express'; // Corrected import statement
import Transaction from '../models/transaction';
import { WebRequest } from '../types';
import { userExtractorMiddleware } from '../utils/middlewares';
import { UserType } from '../models/user'; // Removed "type" keyword

export const transactionsRouter = Router();

transactionsRouter.get('/test', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const user: UserType = request.user;

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
      .populate('patchesFromArray', { 
        title: 1,
      });

      console.log('Trade History 2:', tradeHistory); // Add this line to log the data


    response.json(tradeHistory);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

transactionsRouter.get('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  try {
    const tradeHistoryid = await Transaction
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
      .populate('patchesFromArray', { // Corrected the property name
        title: 1,
      });

    if (tradeHistoryid) {
      response.json(tradeHistoryid);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


// transactionsRouter.post('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
//   // TODO: CREATE TRANSACTION
// })

// transactionsRouter.put('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
//   // TODO: UPDATE TRANSACTION (CHANGE STATUS)
// })
