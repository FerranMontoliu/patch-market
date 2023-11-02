import { Schema, model, Types } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type UniversityType = {
  id?: Types.ObjectId;
  name: string;
}

const universitySchema = new Schema<UniversityType>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

universitySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

universitySchema.plugin(uniqueValidator)

const University = model<UniversityType>('University', universitySchema)

export default University
