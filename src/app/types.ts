// Pokemon types are stored in lists of types and names of the type
export interface PokemonType {
    type: {
        name: string
    }
}

// all stats for a pokemon
export interface Pokemon {
    name: string,
    height: number,
    weight: number,
    sprites: {
        front_default: string
    },
    types: PokemonType[]
}