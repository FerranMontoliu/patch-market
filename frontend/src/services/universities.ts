import axios from 'axios'
import { getAuthConfig } from './config.ts'
import { Patch, University } from '../types.ts'

const baseUrl: string = '/api/universities'

export const getUniversities = async (): Promise<Array<University>> => {
    const response = await axios.get(`${baseUrl}/`, getAuthConfig())
    return (response.data ?? []) as Array<University>
}