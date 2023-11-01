import { Schema, model, Types } from 'mongoose'

export type PatchType = {
  id?: Types.ObjectId;
  owner: Types.ObjectId;
  title: string;
  description?: string;
  image?: string;
  categories?: Array<Types.ObjectId>;
  isTradeable: boolean;
}

const patchSchema = new Schema<PatchType>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: 'Category',
  },
  isTradeable: {
    type: Boolean,
    required: true,
  },
})

patchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Patch = model<PatchType>('Patch', patchSchema)
