export const colors = [
  { tipo: 'fire', primary: '#ff3333', secondary: '#ff6666', fontColor: '#000000' },
  { tipo: 'water', primary: '#3b6cff', secondary: '#6e92ff', fontColor: '#ffffff' },
  { tipo: 'grass', primary: '#00cd33', secondary: '#01ff40', fontColor: '#000000' },
  { tipo: 'poison', primary: '#613e5e', secondary: '#80527c', fontColor: '#ffffff' },
  { tipo: 'bug', primary: '#cece00', secondary: '#e8e800', fontColor: '#000000' },
  { tipo: 'flying', primary: '#add8e6', secondary: '#d4ebf2', fontColor: '#000000' },
  { tipo: 'normal', primary: '#A8A77A', secondary: '#bcbb99', fontColor: '#000000' },
  { tipo: 'ground', primary: '#994d00', secondary: '#cc6700', fontColor: '#ffffff' },
  { tipo: 'electric', primary: '#e6e600', secondary: '#ffff1a', fontColor: '#380B61' },
  { tipo: 'fairy', primary: '#F06292', secondary: '#f491b2', fontColor: '#000000' },
  { tipo: 'psychic', primary: '#8332c3', secondary: '#9b55d3', fontColor: '#ffffff' },
  { tipo: 'steel', primary: '#5d5d5d', secondary: '#777777', fontColor: '#ffffff' },
  { tipo: 'rock', primary: '#85684a', secondary: '#a5825d', fontColor: '#ffffff' },
  { tipo: 'ice', primary: '#b3ebf2', secondary: '#c9f1f6', fontColor: '#263238' },
  { tipo: 'ghost', primary: '#262626', secondary: '#404040', fontColor: '#ffffff' },
  { tipo: 'dragon', primary: '#4000ff', secondary: '#6633ff', fontColor: '#ffffff' },
  { tipo: 'fighting', primary: '#A93226', secondary: '#be382b', fontColor: '#ffffff' },
  { tipo: 'dark', primary: '#705746', secondary: '#8f6f5a', fontColor: '#ffffff' },
]

export const getBackgroundBadge = (type?: string) => {
  if (!type) return
  const color = colors.find((color) => color.tipo === type)
  if (!color) return
  const style = { backgroundColor: color.primary, color: color.fontColor }
  return style
}

export const getFontColor = (type?: string) => {
  if (!type) return
  const color = colors.find((color) => color.tipo === type)
  return color?.fontColor
}

export const getPokemonTypeInSpanish = (type: string): string | undefined => {
  const typesInSpanish: { [key: string]: string } = {
    fire: 'fuego',
    water: 'agua',
    grass: 'planta',
    poison: 'veneno',
    bug: 'bicho',
    flying: 'volador',
    normal: 'normal',
    ground: 'tierra',
    electric: 'eléctrico',
    fairy: 'hada',
    psychic: 'psíquico',
    steel: 'acero',
    rock: 'roca',
    ice: 'hielo',
    ghost: 'fantasma',
    dragon: 'dragón',
    fighting: 'lucha',
    dark: 'siniestro',
  }

  return typesInSpanish[type] || undefined
}
