"use client";
// REACT
import { useState, useCallback } from "react";
// DEBOUNCING
import _debounce from "lodash/debounce";
// COMPONENTS
import PokemonDisplay from "./components/pokemonDisplay";
// INTERFACES
import { Pokemon } from "./types";
import LoadingSpinner from "./components/loadingSpinner";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPokemon = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/fetchPokemon?name=${query}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon data");

      const data: Pokemon = await res.json();
      setPokemon(data);
      setError(null);
      setLoading(false);
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

  // turns "on and off" the pokedex - triggers the animations
  const handlePokedexState = () => {
    setOpen(!open);
  };

  return (
    <div className="pokedexContainer">
      <h1 className="pokedexName">
        {open ? "MyPokedex" : "Welcome"}
      </h1>
      {!open && <div className="pokedexSubtitle">Click the button to start</div>}
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
      {error && <div>Error: {error}</div>}
      {loading ? (
        <div className="loading"><LoadingSpinner /></div>
      ) : (
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
