"use client";
// STYLES
import styles from "./pokemonDisplay.module.scss";
// COMPONENTS
import Image from "next/image";
// INTERFACES
import { PokemonDisplayProps } from "@/app/types";
import PokemonStat from "./pokemonStat";

export default function PokemonDisplay({ pokemon }: PokemonDisplayProps) {
  return (
    pokemon && (
      <div className={styles.pokemonDisplay}>
        <h1 className={styles.pokemonName}>{pokemon.name.toUpperCase()}</h1>

        <div className={styles.pokemonInfoGrid}>
          <div className={styles.pokemonImageBox}>
            <Image
              className={styles.pokemonSprite}
              src={pokemon.sprites.other.home.front_default}
              alt={pokemon.name}
              height={300}
              width={300}
            />
          </div>
          <div>
            <PokemonStat
              dataKey="Height"
              dataValue={String(pokemon.height / 10)}
            />
            <PokemonStat
              dataKey="Weight"
              dataValue={String(pokemon.weight / 10)}    
            />
            <PokemonStat
              dataKey="Type"
              dataValue={pokemon.types[0].type.name}
            />
            <PokemonStat
              dataKey="Ability"
              dataValue={pokemon.abilities[0].ability.name}
            />
          </div>
        </div>
      </div>
    )
  );
}
