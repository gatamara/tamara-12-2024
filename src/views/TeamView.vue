<template>
  <section>
    <SectionTitle text="Mi equipo pokemon" />
    <div class="flex flex-row flex-wrap justify-center p-2 sm:p-3 md:p-5">
      <TeamCard v-for="member in teamList" :key="member.number" v-bind="member" :is-loading="isLoading" @click="onPokemonClick" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { usePokemonStore } from '@/stores/pokemon.store'
import TeamCard from '@/components/cards/TeamCard.vue'
import { storeToRefs } from 'pinia'
import { getPokemonDetail } from '@/api/pokemon.api'
import { onMounted, ref } from 'vue'
import SectionTitle from '@/components/titles/SectionTitle.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = usePokemonStore()
const { teamList } = storeToRefs(store)
const { updateMembers } = store

const isLoading = ref(false)

onMounted(async () => {
  if (teamList.value == undefined || teamList.value.length == 0) return

  try {
    isLoading.value = true

    const promises = teamList.value.map((item) => getPokemonDetail(item.number))

    const pokemons = await Promise.all(promises)

    updateMembers(pokemons)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})

const onPokemonClick = (id: number) => {
  router.push({ name: 'team-detail', params: { id } })
}
</script>
