import { NextResponse } from "next/server";
import { Redis } from "ioredis";
import { Pokemon } from "@/app/types";

const redis = new Redis();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Pokemon name is required" }, { status: 400 });
  }

  try {
    // Check Redis cache
    const cachedData = await redis.get(name);
    if (cachedData) {
      console.log("found in Redis")
      return NextResponse.json(JSON.parse(cachedData) as Pokemon);
    }

    // Fetch from PokeAPI if not cached
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Failed to fetch from PokeAPI");

    const data = (await response.json()) as Pokemon;
    await redis.set(name, JSON.stringify(data), "EX", 3600); // Cache for 1 hour

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
