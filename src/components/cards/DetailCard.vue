<template>
  <div class="p-6 flex justify-center">
    <div class="w-fit bg-black/70 rounded-[10px] p-6">
      <div class="flex flex-row">
        <div class="w-[400px] flex flex-col items-center justify-center">
          <h1 class="text-white text-2xl p-2 uppercase text-center">{{ name }}</h1>
          <img class="h-[300px] w-[300px]" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`" alt="raichu" />
          <div class="flex flex-row gap-2 p-2">
            <span :style="{ backgroundColor: typeAColor?.backgroundColor, color: typeAColor?.color }" class="py-1 px-2 rounded-md">{{ typeAName }}</span>
            <span v-if="typeBName" :style="{ backgroundColor: typeBColor?.backgroundColor, color: typeBColor?.color }" class="py-1 px-2 rounded-md">{{ typeBName }}</span>
          </div>
        </div>
        <div class="w-[400px]">
          <div class="py-4">
            <h1 class="font-semibold pb-4 text-white">Descripcion</h1>
            <p class="text-white/80">{{ description }}</p>
          </div>
          <div class="flex">
            <div class="pr-8">
              <h1 class="font-semibold text-white py-2">Altura</h1>
              <h2 class="text-white/80">{{ height }}</h2>
            </div>
            <div>
              <h1 class="font-semibold text-white py-2">Peso:</h1>
              <h2 class="text-white/80">{{ weight }}</h2>
            </div>
          </div>
          <div class="p-4">
            <audio class="w-full" :src="cries?.latest" controls />
          </div>
          <div v-if="stats" class="p-2 h-[270px]">
            <StatsChart :stats="stats" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePokemonTypes } from '../../composables/pokemon-type'
import type { PokemonCries, PokemonStat } from '../../stores/interfaces/pokemon'
import StatsChart from '../charts/StatsChart.vue'

interface Props {
  number: number
  name: string
  image: string
  typeA?: string | undefined
  typeB?: string | undefined
  stats?: PokemonStat[] | undefined
  cries?: PokemonCries | undefined
  height?: number | undefined
  weight?: number | undefined
  description?: string | undefined
}

const { name, number, typeA, typeB, stats, description, cries, height, weight } = defineProps<Props>()

const { typeAColor, typeAName, typeBColor, typeBName } = usePokemonTypes(typeA, typeB)
</script>
<style scoped></style>
