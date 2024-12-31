<template>
  <section class="relative" ref="scrollComponent">
    <SectionTitle text="Elige 6 pokemon para tu equipo" />
    <div class="flex flex-row flex-wrap justify-center p-2 sm:p-3 md:p-5">
      <ItemCard v-for="(item, index) in pokemonList" :key="index" v-bind="item" @selected="onCardSelected" />
    </div>
    <FloatButton :total="totalTeam" @click="onFloatButtonClick" />
    <div class="p-3" v-if="isPaginationLoading">
      <PikachuLoading />
    </div>
  </section>
</template>

<script setup lang="ts">
import ItemCard from '@/components/cards/ItemCard.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { getPokemonList } from '@/api/pokemon.api'
import type { PokemonItem } from '@/views/interfaces/pokemon'
import { usePokemonStore } from '@/stores/pokemon.store'
import type { Pokemon } from '@/stores/interfaces/pokemon'
import FloatButton from '@/components/buttons/FloatButton.vue'
import { storeToRefs } from 'pinia'
import PikachuLoading from '@/components/loadings/PikachuLoading.vue'
import { useRouter } from 'vue-router'
import SectionTitle from '@/components/titles/SectionTitle.vue'

const store = usePokemonStore()
const { totalTeam, teamList } = storeToRefs(store)
const { addTeamMember } = store

const router = useRouter()

const scrollComponent = ref<HTMLDivElement | null>(null)
const isPaginationLoading = ref(false)

const pokemonList = ref<PokemonItem[]>()

let limit = 25
let offset = 0

onMounted(async () => {
  await loadPokemons()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(async () => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = (e) => {
  if (!scrollComponent.value) return

  const element = scrollComponent.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMorePokemons()
  }
}

const loadPokemons = async () => {
  const pokemons = await getPokemonList(limit, offset)

  pokemonList.value = pokemons.map((pokemon) => {
    return {
      ...pokemon,
      isSelected: teamList.value.some((p) => p.number === pokemon.number),
    }
  })
}

const loadMorePokemons = async () => {
  if (pokemonList.value === undefined) return
  if (pokemonList.value.length === 151 || offset > 125) return

  calculateNextPage()

  try {
    isPaginationLoading.value = true

    const pokemons = await getPokemonList(limit, offset)

    pokemonList.value = [...pokemonList.value, ...pokemons].map((pokemon) => {
      return {
        ...pokemon,
        isSelected: teamList.value.some((p) => p.number === pokemon.number),
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    isPaginationLoading.value = false
  }
}

watch(totalTeam, () => {
  pokemonList.value = pokemonList.value?.map((pokemon) => {
    return {
      ...pokemon,
      isSelected: teamList.value.some((p: Pokemon) => p.number === pokemon.number),
    }
  })
})

const onCardSelected = (number: number) => {
  const selectedPokemon = pokemonList.value?.find((p) => p.number === number)

  if (!selectedPokemon) return

  const pokemon: Pokemon = {
    name: selectedPokemon.name,
    image: selectedPokemon.image,
    number: selectedPokemon.number,
  }

  addTeamMember(pokemon)
}

const onFloatButtonClick = () => {
  router.push({ name: 'team' })
}

const calculateNextPage = () => {
  offset = offset + 25

  if (offset === 125) {
    limit = 26
  } else {
    limit = 25
  }
}
</script>
