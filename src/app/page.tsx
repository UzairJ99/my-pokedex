"use client";
// REACT
import { useState } from "react";
// COMPONENTS
import Image from "next/image";


export default function Home() {
  const [pokemon, setPokemon] = useState();
  const [search, setSearch] = useState("");

  async function fetchPokemon() {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    let data = await res.json();
    setPokemon(data);
  }

  const handleSearch = async () => {
    fetchPokemon();
  };

  return (
    <div>
      <textarea onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {pokemon && (
        <div>
          <h1>{pokemon["name"]}</h1>
          <Image
            src={pokemon["sprites"]["front_default"]}
            alt={pokemon["name"]}
            height={200}
            width={200}
          />
          <div>height: {pokemon["height"] / 10}'</div>
          <div>weight: {pokemon["weight"] / 10}lbs</div>
          <div>type: {pokemon["types"][0]["type"]["name"]}</div>
        </div>
      )}
    </div>
  );
}
