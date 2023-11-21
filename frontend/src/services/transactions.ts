import axios from 'axios';
import { getAuthConfig } from './config.ts';
import { Transaction } from '../types.ts';

const baseUrl: string = '/api/transactions';

export const getTradeHistory = async (): Promise<Array<Transaction>> => {
  const response = await axios.get(`${baseUrl}/`, getAuthConfig())
  return (response.data ?? []) as Array<Transaction>
}

export const getTransactionById = async (transactionId: string): Promise<Transaction | null> => {
  try {
    const response = await axios.get(`${baseUrl}/${transactionId}`, getAuthConfig());
    const transactionData = response.data as Transaction | null;
    return transactionData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const updateTransactionStatus = async (transactionId: string, newStatus: string): Promise<Transaction | null> => {
    const response = await axios.put(`${baseUrl}/${transactionId}`, { newStatus: newStatus }, getAuthConfig())
    return response.data as Transaction ?? null
}

export type AddTransactionProps = {
  patchTo: string
  patchesFrom: Array<string>
  from: string
  to: string
}

export const addTransaction = async (transaction: AddTransactionProps): Promise<Transaction | null> => {
    const response = await axios.post(`${baseUrl}/`, transaction, getAuthConfig())
    const savedTransaction = response.data as Transaction | null
    return savedTransaction
}