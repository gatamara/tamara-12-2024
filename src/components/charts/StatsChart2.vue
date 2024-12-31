<template>
  <div class="flex flex-wrap justify-center">
    <h1 class="text-white/70 uppercase font-medium text-lg w-full text-center">Stats base</h1>
    <div class="w-[240px]">
      <Radar :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Radar } from 'vue-chartjs'

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import type { PokemonStat } from '../../stores/interfaces/pokemon'
import { computed } from 'vue'

interface Props {
  stats: PokemonStat[]
}

const props = defineProps<Props>()

const statNames = computed(() => props.stats.map((s) => s.name.toLowerCase()))
const statValues = computed(() => props.stats.map((s) => s.base))

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const chartData = {
  labels: statNames.value,
  datasets: [
    {
      label: 'Base stats',
      backgroundColor: 'rgba(43,255,136,0.2)',
      borderColor: 'rgba(43,255,136,1)',
      pointBackgroundColor: 'rgba(43,255,136,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(43,255,136,1)',
      data: statValues.value,
    },
  ],
}
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      angleLines: {
        color: '#e5e5e5',
      },
      grid: {
        color: '#CECECE',
      },
      pointLabels: {
        color: '#2bff88',
      },
      ticks: {
        color: '#e5e5e5',
        backdropColor: 'transparent',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}
</script>
<style scoped></style>
