import { computed } from 'vue'
import { getBackgroundBadge, getPokemonTypeInSpanish } from '@/utils'

export const usePokemonTypes = (typeA?: string | undefined, typeB?: string | undefined) => {
  const typeAColor = computed(() => getBackgroundBadge(typeA))
  const typeBColor = computed(() => getBackgroundBadge(typeB))

  const typeAName = computed(() => getPokemonTypeInSpanish(typeA ?? ''))
  const typeBName = computed(() => getPokemonTypeInSpanish(typeB ?? ''))

  return {
    typeAColor,
    typeAName,
    typeBColor,
    typeBName,
  }
}
