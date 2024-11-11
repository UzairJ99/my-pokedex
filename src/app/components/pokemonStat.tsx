"use client";
// STYLES
import styles from "./pokemonDisplay.module.scss";


// INTERFACES
interface PokemonStatProps {
  dataKey: string;
  dataValue: string;
  units: string;
}

export default function PokemonStat({
  dataKey,
  dataValue,
  units,
}: PokemonStatProps) {
  return (
    <div className={styles.pokemonStat}>
      <div>{dataKey}</div>
      <div>
        {dataValue} {units}
      </div>
    </div>
  );
}
