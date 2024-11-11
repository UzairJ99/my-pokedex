import { NextResponse } from "next/server";
import redisClient from '../../../../lib/redis';
import { Pokemon } from "@/app/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Pokemon name is required" }, { status: 400 });
  }

  try {
    // Check Redis cache
    const cachedData = await redisClient.get(name);
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData) as Pokemon);
    } else {
    }

    // Fetch from PokeAPI if not cached
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Failed to fetch from PokeAPI");

    const data = (await response.json()) as Pokemon;
    // Cache for 1 hour
    await redisClient.set(name, JSON.stringify(data), {EX: 3600}); 

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
