import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Pokemon } from './interfaces/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  // states
  const team = ref<Pokemon[]>([])

  // getters
  const totalTeam = computed(() => team.value.length)
  const teamList = computed(() => [...team.value])

  // actions
  function addTeamMember(pokemon: Pokemon) {
    if (team.value.some((p) => p.number === pokemon.number)) return
    if (team.value.length < 6) {
      team.value.push(pokemon)
    }
  }

  function updateMembers(pokemon: Pokemon[]) {
    team.value = pokemon
  }

  function removeMembers(number: number) {
    team.value = team.value.filter((t) => t.number !== number)
  }

  return { totalTeam, teamList, addTeamMember, updateMembers, removeMembers }
})
