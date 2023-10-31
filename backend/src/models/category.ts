import { Schema, model } from 'mongoose'

export type CategoryType = {
  // TODO
}

const categorySchema = new Schema<CategoryType>({
  // TODO
})

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Category = model<CategoryType>('Category', categorySchema)
