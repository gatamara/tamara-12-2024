import type { PokemonDetailResponse } from '@/api/responses/pokemon-detail.response'
import type { PokemonListResponse } from '@/api/responses/pokemon-list.response'
import type { Pokemon } from '@/stores/interfaces/pokemon'
import type { PokemonItem } from '@/views/interfaces/pokemon'

export const mapResponseToPokemonList = (response: PokemonListResponse) => {
  return response.results.map((result) => {
    const pokemonNumber = Number(result.url.match(/\/(\d+)\/$/)?.[1] || 1)

    const item: PokemonItem = {
      number: pokemonNumber,
      name: result.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`,
      url: result.url,
      isSelected: false,
    }

    return item
  })
}

export const mapResponseToPokemonDetail = (response: PokemonDetailResponse, description: string): Pokemon => {
  return {
    number: response.id,
    name: response.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`,
    typeA: response.types.find((type) => type.slot == 1)?.type?.name,
    typeB: response.types.find((type) => type.slot == 2)?.type?.name,
    stats: response.stats.map((stat) => {
      return {
        name: stat.stat.name,
        base: stat.base_stat,
      }
    }),
    cries: response.cries,
    height: response.height,
    weight: response.weight,
    description: description,
  }
}
