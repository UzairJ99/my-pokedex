"use client";
// REACT
import { useState, useCallback } from "react";
// DEBOUNCING
import _debounce from "lodash/debounce";
// COMPONENTS
import LoadingSpinner from "./components/loadingSpinner";
import PokemonDisplay from "./components/pokemonDisplay";
// INTERFACES
import { Pokemon } from "./types";


export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

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
      setLoading(false);
    }
  };

  const getBattlePerformance = async (query: string) => {
    try {
      const res = await fetch('/api/aiBattle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setResponse(data || 'No response');
    } catch (err: any) {
      setError(err.message);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }

  // Debounced handler
  const handleSearch = useCallback(
    _debounce((query: string) => {
      if (query) {
        fetchPokemon(query);
        getBattlePerformance(query);
      }
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
      {error && <div className="errorMsg">Error: {error} :(</div>}
      {loading ? (
        <div className="loading"><LoadingSpinner /></div>
      ) : (
        <PokemonDisplay closeHandler={handlePokedexState} pokemon={pokemon} battlePerformance={response} />
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
