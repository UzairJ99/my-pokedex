"use client";
// STYLES
import styles from "./pokemonStat.module.scss";
// INTERFACES
import { PokemonStatProps, StatMap } from "../types";


export default function PokemonStat({
  dataKey,
  dataValue
}: PokemonStatProps) {

    // map units
    let dataUnitMap:StatMap = {
        height: "'",
        weight: " lbs",
        type: "",
        ability: ""
    }

  return (
    <div className={styles.pokemonStat}>
      <div>{dataKey}</div>
      <div>
        {dataValue}{dataUnitMap[dataKey.toLowerCase()]}
      </div>
    </div>
  );
}
