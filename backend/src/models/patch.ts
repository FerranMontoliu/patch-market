import { Schema, model } from 'mongoose'

export type PatchType = {
  // TODO
}

const patchSchema = new Schema<PatchType>({
  // TODO
})

patchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Patch = model<PatchType>('Patch', patchSchema)
