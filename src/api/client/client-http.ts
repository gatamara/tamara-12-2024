import axios from 'axios'
const POKE_API_URL = 'https://pokeapi.co/api/v2'

export const getHttpClient = () => {
  const httpClient = axios.create({
    baseURL: POKE_API_URL,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
  })

  return httpClient
}
