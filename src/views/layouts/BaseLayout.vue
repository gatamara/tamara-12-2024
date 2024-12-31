<template>
  <div class="gradient min-h-screen relative pb-[64px]">
    <NavBar />

    <main>
      <RouterView />
    </main>

    <BaseFooter />
  </div>
</template>
<script lang="ts" setup>
import BaseFooter from '@/components/footer/BaseFooter.vue'
import NavBar from '@/components/navigation/NavBar.vue'
</script>
<style scoped>
.gradient {
  background-color: #4158d1;
  background-image: linear-gradient(90deg, #4158d1 0%, #c850c1 46%, #fab43a 100%);
  background-size: contain;
  color: #a1a1a1;
}
</style>
