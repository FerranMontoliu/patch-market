import { Schema, model } from 'mongoose'

export type TransactionType = {
  // TODO
}

const transactionSchema = new Schema<TransactionType>({
  // TODO
})

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Transaction = model<TransactionType>('Transaction', transactionSchema)

export default Transaction
