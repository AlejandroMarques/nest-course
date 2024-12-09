export const pokemonIds:number[] = [1, 20, 30, 34, 66]

interface Pokemon {
  id: number
  name: string
  level: number
}

export const bulbasaur: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  level: 5,
}

export const charmander: Pokemon = {
  id: 7,
  name: 'Charmander',
  level: 5,
}

export const pokemons: Pokemon[] = [bulbasaur, charmander]

console.log(pokemons)
