"use client";
// STYLES
import styles from "./pokemonDisplay.module.scss";
// COMPONENTS
import Image from "next/image";
// INTERFACES
import { Pokemon } from "@/app/types";
import PokemonStat from "./pokemonStat";

// set props to use the Pokemon interface if pokemon is existent
interface PokemonDisplayProps {
  pokemon: Pokemon | null;
}

export default function PokemonDisplay({ pokemon }: PokemonDisplayProps) {
  return (
    pokemon && (
      <div className={styles.pokemonDisplay}>
        <h1 className={styles.pokemonName}>{pokemon.name.toUpperCase()}</h1>

        <div className={styles.pokemonInfoGrid}>
          <div className={styles.pokemonImageBox}>
            <Image
              className={styles.pokemonSprite}
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              height={300}
              width={300}
            />
          </div>
          <div>
            <PokemonStat
              dataKey="Height"
              dataValue={String(pokemon.weight / 10)}
              units="'"
            />
            <PokemonStat
              dataKey="Weight"
              dataValue={String(pokemon.weight / 10)}
              units="lbs"
            />
            <PokemonStat
              dataKey="Type"
              dataValue={pokemon.types[0].type.name}
              units=""
            />
            <PokemonStat
              dataKey="Ability"
              dataValue={pokemon.abilities[0].ability.name}
              units=""
            />
          </div>
        </div>
      </div>
    )
  );
}
