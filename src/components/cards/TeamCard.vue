<template>
  <div class="w-[400px] bg-zinc-600 m-2 rounded-[10px] overflow-hidden relative cursor-pointer" @click="onClick">
    <div class="absolute right-3 top-2">
      <DeleteButton @click="onRemovePokemonClick" />
    </div>

    <div class="h-[400px]">
      <img :src="image" :alt="name" />
    </div>
    <div class="bg-zinc-900 p-3">
      <div class="text-white text-2xl p-2">
        <h1 class="uppercase">{{ name }}</h1>
      </div>
      <template v-if="isLoading">
        <PokeballLoading />
      </template>
      <template v-else>
        <div class="flex flex-row gap-2 p-2">
          <span :style="{ backgroundColor: typeAColor?.backgroundColor, color: typeAColor?.color }" class="py-1 px-2 rounded-md">{{ typeAName }}</span>
          <span v-if="typeBName" :style="{ backgroundColor: typeBColor?.backgroundColor, color: typeBColor?.color }" class="py-1 px-2 rounded-md">{{ typeBName }}</span>
        </div>
        <div class="p-2">
          <audio class="w-full" :src="cries?.latest" controls />
        </div>
        <div v-if="stats" class="p-2 h-[270px]">
          <StatsChart :stats="stats" />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PokemonCries, PokemonStat } from '@/stores/interfaces/pokemon'
import StatsChart from '@/components/charts/StatsChart.vue'
import PokeballLoading from '@/components/loadings/PokeballLoading.vue'
import DeleteButton from '@/components/buttons/DeleteButton.vue'
import { usePokemonStore } from '@/stores/pokemon.store'
import { usePokemonTypes } from '@/composables/pokemon-type'
interface Props {
  isLoading: boolean
  number: number
  name: string
  image: string
  typeA?: string | undefined
  typeB?: string | undefined
  stats?: PokemonStat[] | undefined
  cries?: PokemonCries | undefined
}
interface Emits {
  click: [id: number]
}
const store = usePokemonStore()
const { removeMembers } = store

const { isLoading, number, name, typeA, typeB, cries, stats } = defineProps<Props>()

const { typeAColor, typeAName, typeBColor, typeBName } = usePokemonTypes(typeA, typeB)

const onRemovePokemonClick = () => {
  removeMembers(number)
}

const emits = defineEmits<Emits>()

const onClick = () => {
  emits('click', number)
}
</script>
