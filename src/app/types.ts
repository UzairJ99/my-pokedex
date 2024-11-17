// Pokemon types are stored in lists of types and names of the type
export interface PokemonType {
  type: {
    name: string;
  };
}

// Pokemon abilities are stored in lists of abilities with their name
export interface PokemonAbility {
  ability: {
    name: string;
  };
}

// all stats for a pokemon
export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
}

// props for the pokemon display component
export interface PokemonDisplayProps {
    pokemon: Pokemon | null;
}

// props for the pokemon stat component
export interface PokemonStatProps {
  dataKey: string;
  dataValue: string;
}

// needed to set type of key and value for the below stat map
export interface IObjectKeys {
  [key: string]: string | string;
}

// used to assign the units to the stat type
export interface StatMap extends IObjectKeys {
  readonly height: string;
  readonly weight: string;
  readonly type: string;
  readonly ability: string;
}
