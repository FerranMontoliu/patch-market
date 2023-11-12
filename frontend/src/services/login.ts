import axios from 'axios'
import { setToken } from './config.ts'

const baseUrl: string = '/api/login'

type LoginProps = {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginProps) => {
  const response = await axios.post(baseUrl, { email, password })
  setToken(response.data.token)
  return response.data
}