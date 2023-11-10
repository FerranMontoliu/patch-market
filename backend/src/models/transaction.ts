import { Schema, model, Types } from 'mongoose'

enum TransactionStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Cancelled = 'cancelled',
}

export type TransactionType = {
  id: Types.ObjectId;
  patchesFrom: Types.ObjectId[];
  patchTo: Types.ObjectId;
  from: Types.ObjectId;
  to: Types.ObjectId;
  createDate: Date;
  lastUpdateDate: Date;
  status: TransactionStatus;
}

const transactionSchema = new Schema<TransactionType>({
  patchesFrom: [{
    type: Schema.Types.ObjectId,
    ref: 'Patch',
    required: true,
  }],
  patchTo: {
    type: Schema.Types.ObjectId,
    ref: 'Patch',
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
  lastUpdateDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: TransactionStatus,
    default: TransactionStatus.Pending,
    required: true,
  },
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
