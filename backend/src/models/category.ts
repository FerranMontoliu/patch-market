import { Schema, model, Types } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type CategoryType = {
  id?: Types.ObjectId;
  name: string;
}

const categorySchema = new Schema<CategoryType>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

categorySchema.plugin(uniqueValidator)

export const Category = model<CategoryType>('Category', categorySchema)
