<template>
  <SectionTitle text="Detalle del pokemon" />
  <DetailCard v-if="pokemon" v-bind="pokemon" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import DetailCard from '@/components/cards/DetailCard.vue'
import SectionTitle from '@/components/titles/SectionTitle.vue'
import { usePokemonStore } from '@/stores/pokemon.store'

import type { Pokemon } from '@/stores/interfaces/pokemon'

interface Props {
  id: number
}

const props = defineProps<Props>()

const store = usePokemonStore()

const pokemon = ref<Pokemon>()

pokemon.value = store.teamList.find((t) => t.number === props.id)
</script>
