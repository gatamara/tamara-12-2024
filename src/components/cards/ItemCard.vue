<template>
  <!--selected bg-black/70-->
  <div
    :class="{ 'bg-black/70': isSelected, 'card-transition': !isSelected }"
    class="card-border w-[300px] h-[400px] flex flex-col items-center p-4 relative m-5 cursor-pointer"
    @click="onClick"
  >
    <img v-if="isSelected" class="absolute left-2 top-2" src="@/assets/pokeball-icon.svg" alt="" width="50" height="50" />
    <img v-else class="absolute left-2 top-2" src="@/assets/pokeball-icon-gray.svg" alt="" width="50" height="50" />
    <div class="absolute right-3 top-2">
      <h2 class="text-white/80 font-bold text-lg"># {{ number }}</h2>
    </div>
    <div class="bg-circle">
      <img class="absolute w-4/5 h-4/5 object-contain" :src="image" :alt="name" />
    </div>
    <h1 class="text-xl font-semibold text-white absolute bottom-3 uppercase">{{ name }}</h1>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  number: number
  name: string
  image: string
  url: string
  isSelected: boolean
}
interface Emits {
  selected: [number: number]
}

const { number, name, image, isSelected } = defineProps<Props>()

const emits = defineEmits<Emits>()

const onClick = () => {
  emits('selected', number)
}
</script>
<style scoped>
.card-border {
  @apply rounded-[10px] shadow-[0_5px_10px_rgba(0,0,0,1)];
}

.bg-circle {
  @apply w-[250px] h-[250px] rounded-full bg-[#2bff88];
}

.card-transition {
  @apply transition ease-in-out  hover:scale-[1.03] hover:bg-black/30 duration-300;
}
</style>
