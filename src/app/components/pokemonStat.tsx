"use client";
// STYLES
import styles from "./pokemonStat.module.scss";


// INTERFACES
interface PokemonStatProps {
  dataKey: string;
  dataValue: string;
}

interface IObjectKeys {
    // needed to set type of key and value for the below stat map
    [key: string]: string | string;
}

interface statMap extends IObjectKeys{
    readonly height: string;
    readonly weight: string;
    readonly type: string;
    readonly ability: string;
}

export default function PokemonStat({
  dataKey,
  dataValue
}: PokemonStatProps) {

    // map units
    let dataUnitMap:statMap = {
        height: "'",
        weight: "lbs",
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
