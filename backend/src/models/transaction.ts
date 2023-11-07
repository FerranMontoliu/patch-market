import { Schema, model, Types } from 'mongoose'


enum TransactionStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
}

export type TransactionType = {
  id?: Types.ObjectId;
  patchesFromArray: Types.ObjectId[];
  patchTo: Types.ObjectId;
  from: Types.ObjectId;
  to: Types.ObjectId;
  createDate: Date; // check this later
  lastUpdateDate: Date; // check this later
  status: TransactionStatus; // Use the TransactionStatus enum
}

const transactionSchema = new Schema<TransactionType>({
  patchesFromArray: [{ type: Schema.Types.ObjectId, ref: 'Patch' }],
  patchTo: { type: Schema.Types.ObjectId, ref: 'Patch' },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  createDate: { type: Date, required: true },
  lastUpdateDate: { type: Date, required: true },
  status: { type: String, enum: Object.values(TransactionStatus), required: true },
});

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Transaction = model<TransactionType>('Transaction', transactionSchema)
export default Transaction
