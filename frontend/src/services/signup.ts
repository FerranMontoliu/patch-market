import axios from 'axios'
import { User } from '../types.ts'

const baseUrl: string = '/api/users'

type SignUpProps = {
  email: string;
  name: string;
  surname: string;
  telegramUser: string;
  password: string;
}

export const signUp = async (userData: SignUpProps): Promise<User | null> => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}