import { mapResponseToPokemonDetail, mapResponseToPokemonList } from '@/mapper/pokemon.mapper'
import type { Pokemon } from '@/stores/interfaces/pokemon'
import type { PokemonItem } from '@/views/interfaces/pokemon'
import { getHttpClient } from './client/client-http'
import type { PokemonDetailResponse } from './responses/pokemon-detail.response'
import type { PokemonListResponse } from './responses/pokemon-list.response'
import type { PokemonSpeciesResponse } from './responses/pokemon-species.response'

export const getPokemonList = async (limit: number, offset: number): Promise<PokemonItem[]> => {
  const response = await getHttpClient().get<PokemonListResponse>(`/pokemon`, {
    params: {
      limit: limit,
      offset: offset,
    },
  })
  const pokemonList: PokemonItem[] = mapResponseToPokemonList(response.data)

  return pokemonList
}

export const getPokemonDetail = async (id: number): Promise<Pokemon> => {
  const response = await getHttpClient().get<PokemonDetailResponse>(`/pokemon/${id}`)
  const description = await getPokemonDescription(id)

  const pokemon: Pokemon = mapResponseToPokemonDetail(response.data, description)
  return pokemon
}

const getPokemonDescription = async (id: number): Promise<string> => {
  const response = await getHttpClient().get<PokemonSpeciesResponse>(`/pokemon-species/${id}`)
  const texto = response.data.flavor_text_entries
  const descripcion = texto.find((e) => e.language.name === 'es')

  return descripcion?.flavor_text ?? ''
}
