import axios from 'axios'
import { getAuthConfig } from './config.ts'
import { Patch } from '../types.ts'

const baseUrl: string = '/api/patches'

export const getOwnPatches = async (): Promise<Array<Patch>> => {
  const response = await axios.get(`${baseUrl}/owned`, getAuthConfig())
  console.log('Response data OwnPatches:', response.data);
  return (response.data ?? []) as Array<Patch>
}

export const getTradeHistory = async (): Promise<Array<Patch>> => {
  const response = await axios.get(`${baseUrl}/tradehistory`, getAuthConfig())
  console.log('Response data tradeHistory:', response.data);

  return (response.data ?? []) as Array<Patch>
}

export const getTradeablePatches = async (): Promise<Array<Patch>> => {
  const response = await axios.get(`${baseUrl}/tradeable`, getAuthConfig())
  console.log('Response data getTradeablePatches:', response.data);

  return (response.data ?? []) as Array<Patch>
}

export const getPatchById = async (patchId: string): Promise<Patch | null> => {
  const response = await axios.get(`${baseUrl}/${patchId}`, getAuthConfig())

  return response.data as Patch ?? null
}
