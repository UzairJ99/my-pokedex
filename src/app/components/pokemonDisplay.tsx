"use client";
// STYLES
import styles from "./pokemonDisplay.module.scss";
// COMPONENTS
import Image from "next/image";
// INTERFACES
import { Pokemon } from "@/app/types";

// set props to use the Pokemon interface if pokemon is existent
interface PokemonDisplayProps {
  pokemon: Pokemon | null;
}

export default function PokemonDisplay({ pokemon }: PokemonDisplayProps) {
  return (
    pokemon && (
      <div className={styles.pokemonDisplay}>
        <h1 className={styles.pokemonName}>{pokemon.name.toUpperCase()}</h1>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          height={200}
          width={200}
        />
        <div className={styles.pokemonStat}>
          <div>Height</div>
          <div>{pokemon.height / 10}'</div>
        </div>
        <div className={styles.pokemonStat}>
          <div>Weight</div>
          <div>{pokemon.weight / 10}lbs</div>
        </div>
        <div className={styles.pokemonStat}>
          <div>Type</div>
          <div>{pokemon.types[0].type.name}</div>
        </div>
        <div className={styles.pokemonStat}>
          <div>Ability</div>
          <div>{pokemon.abilities[0].ability.name}</div>
        </div>
      </div>
    )
  );
}
