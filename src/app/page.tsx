"use client";
// REACT
import { useState } from "react";
// COMPONENTS
import PokemonDisplay from "./components/pokemonDisplay";

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <textarea
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
      {pokemon && <PokemonDisplay pokemon={pokemon} />}
    </div>
  );
}
