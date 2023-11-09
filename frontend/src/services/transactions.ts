import axios from 'axios'
import { getAuthConfig } from './config.ts'
import { Transaction } from '../types.ts'

const baseUrl: string = '/api/transactions';

export const getTradeHistory = async (): Promise<Array<Transaction>> => {
  try {
    const response = await axios.get(`${baseUrl}/`, getAuthConfig());
    return (response.data ?? []) as Array<Transaction>;
  } catch (error) {
    console.error('Error fetching trade history:', error);
    throw error; 
  }
}

export const getTransactionById = async (transactionId: string): Promise<Transaction | null> => {
  const response = await axios.get(`${baseUrl}/${transactionId}`, getAuthConfig())
  return response.data as Transaction ?? null
}
