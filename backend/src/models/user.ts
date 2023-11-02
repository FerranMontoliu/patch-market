import { Schema, model, type Types } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type UserType = {
  id?: Types.ObjectId;
  email: string;
  name: string;
  surname: string;
  passwordHash?: string;
  telegramUser: string;
}

const userSchema = new Schema<UserType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  telegramUser: {
    type: String,
    required: true,
    unique: true,
  },
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = model<UserType>('User', userSchema)

export default User
