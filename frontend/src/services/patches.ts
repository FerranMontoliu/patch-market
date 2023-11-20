import axios from 'axios'
import { getAuthConfig } from './config.ts'
import { Patch } from '../types.ts'

const baseUrl: string = '/api/patches'

export const getOwnPatches = async (): Promise<Array<Patch>> => {
  const response = await axios.get(`${baseUrl}/owned`, getAuthConfig())
  return (response.data ?? []) as Array<Patch>
}

export const getTradeablePatches = async (): Promise<Array<Patch>> => {
  const response = await axios.get(`${baseUrl}/tradeable`, getAuthConfig())
  return (response.data ?? []) as Array<Patch>
}

export const getPatchById = async (patchId: string): Promise<Patch | null> => {
  const response = await axios.get(`${baseUrl}/${patchId}`, getAuthConfig())
  return response.data as Patch ?? null
}

export type AddPatchProps = {
  title: string
  description?: string
  universityId: string
  categoriesNames: Array<string>
  image: string
}

export const addPatch = async (patch: AddPatchProps): Promise<Patch | null> => {
  const response = await axios.post(`${baseUrl}/`, patch, getAuthConfig())
  return response.data as Patch ?? null
}

export const makePatchTradeable = async (patch: Patch): Promise<Patch | null> => {
  const response = await axios.put(`${baseUrl}/tradeable`, patch, getAuthConfig())
  return response.data as Patch ?? null
}
