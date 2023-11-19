import { Schema, model, Types } from 'mongoose'

export type PatchType = {
  id?: Types.ObjectId;
  owner: Types.ObjectId;
  title: string;
  university: Types.ObjectId;
  description?: string;
  image: string;
  categories: Types.ObjectId[];
  tradeable: boolean;
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
  university: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'University',
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }],
  tradeable: {
    type: Boolean,
    default: false,
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

const Patch = model<PatchType>('Patch', patchSchema)

export default Patch
