import axios from 'axios'

const baseUrl: string = '/api/login'

type LoginProps = {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginProps) => {
  const response = await axios.post(baseUrl, { email, password })

  return response.data
}
