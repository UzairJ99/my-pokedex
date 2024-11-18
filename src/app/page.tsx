"use client";
// REACT
import { useState, useCallback } from "react";
// DEBOUNCING
import _debounce from "lodash/debounce";
// COMPONENTS
import PokemonDisplay from "./components/pokemonDisplay";
// INTERFACES
import { Pokemon } from "./types";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const fetchPokemon = async (query: string) => {
    try {
      const res = await fetch(`/api/fetchPokemon?name=${query}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon data");

      const data: Pokemon = await res.json();
      setPokemon(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setPokemon(null);
    }
  };

  // Debounced handler
  const handleSearch = useCallback(
    _debounce((query: string) => {
      if (query) fetchPokemon(query);
      setSearch("");
    }, 500),
    []
  );

  // Allows search to be triggered upon the Enter key being pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleSearch(search);
      setSearch("");
    }
  };

  const handlePokedexState = () => {
    setOpen(!open);
    console.log(open);
  };

  return (
    <div className="pokedexContainer">
      <h1 className="pokedexName">
        {open ? "MyPokedex" : "Click Button to Open"}
      </h1>
      <textarea
        placeholder="Enter Pokémon name"
        onChange={(e) => {
          const query = e.target.value.trim().toLowerCase();
          setSearch(query);
        }}
        value={search}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      {/* <button className="searchBtn" onClick={() => handleSearch(search)}>
        Search
      </button> */}
      {error && <div>Error: {error}</div>}
      {pokemon && (
        <PokemonDisplay closeHandler={handlePokedexState} pokemon={pokemon} />
      )}

      {/* Backdrop UI */}
      <div className={`backdrop ${open && "backdropDrop"}`}></div>
      <div className={`screen ${open && "screenTop"}`}></div>
      <div
        onClick={handlePokedexState}
        className={`pokeball ${open && "pokeballClicked"}`}
      >
        <div className="pokeballDesign"></div>
        <div className="topPokeballDesign"></div>
      </div>
    </div>
  );
}
