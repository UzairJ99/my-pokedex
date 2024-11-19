"use client";
// STYLES
import styles from "./pokemonDisplay.module.scss";
// REACT
import { Fragment, useState } from "react";
// COMPONENTS
import Image from "next/image";
// INTERFACES
import { PokemonDisplayProps } from "@/app/types";
import PokemonStat from "./pokemonStat";
import LoadingSpinner from "./loadingSpinner";


export default function PokemonDisplay({
  pokemon,
  closeHandler,
}: PokemonDisplayProps) {

  const [loading, setLoading] = useState<boolean>(true);


  return (
    pokemon && (
      <Fragment>
        <div className="loading" style={{display: loading ? "flex" : "none"}}>
          <LoadingSpinner />
        </div>

        <div style={{opacity: loading ? 0 : 1}} className={styles.pokemonDisplay}>
        <div className={styles.pokemonInfoGrid}>
          <div className={styles.pokemonImageBox}>
            <Image
              className={styles.pokemonSprite}
              src={pokemon.sprites.other.home.front_default}
              alt={pokemon.name}
              height={300}
              width={300}
              priority
              onLoad={() => setLoading(false)}
            />
            <h1 className={styles.pokemonName}>{pokemon.name.toUpperCase()}</h1>
          </div>
          <div className="statsContainer">
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
        <div onClick={closeHandler} className={styles.closeBtn}>
          X
        </div>
      </div>
      </Fragment>
      
    )
  );
}
