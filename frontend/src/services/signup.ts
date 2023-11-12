import axios from 'axios'

const baseUrl: string = '/api/users'

type SignUpProps = {
  email: string;
  name: string;
  surname: string;
  telegramUser: string;
  password: string;
};

export const signUp = async (userData: SignUpProps) => {
  try {
    const response = await axios.post(baseUrl, userData)
    const user = response.data
    return user
  } catch (error) {
    throw error; 
  }
};