import axios from 'axios'
import { getAuthConfig } from './config.ts'
import { Category } from '../types.ts'

const baseUrl: string = '/api/categories'

export const getCategories = async (): Promise<Array<Category>> => {
  const response = await axios.get(`${baseUrl}/`, getAuthConfig())
  return (response.data ?? []) as Array<Category>
}
