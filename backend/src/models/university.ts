import { Schema, model } from 'mongoose'

export type UniversityType = {
  // TODO
}

const universitySchema = new Schema<UniversityType>({
  // TODO
})

universitySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const University = model<UniversityType>('University', universitySchema)
