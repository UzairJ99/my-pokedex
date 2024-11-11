"use client"

// COMPONENTS
import Image from "next/image";
// INTERFACES
import { Pokemon } from "@/app/types";

// set props to use the Pokemon interface if pokemon is existent
interface PokemonDisplayProps {
    pokemon: Pokemon | null;
}

export default function PokemonDisplay({pokemon}: PokemonDisplayProps) {
  return pokemon && (
    <div>
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        height={200}
        width={200}
      />
      <div>height: {pokemon.height / 10}'</div>
      <div>weight: {pokemon.weight / 10}lbs</div>
      <div>type: {pokemon.types[0].type.name}</div>
    </div>
  );
}
