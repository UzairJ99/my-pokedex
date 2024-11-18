// NEXT
import { NextResponse } from "next/server";
// CONTAINERS
import redisClient from "../../../../lib/redis";
// INTERFACES
import { Pokemon } from "@/app/types";

export async function GET(request: Request) {
  const PROD = true; // only use Redis on production

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Pokemon name is required" },
      { status: 400 }
    );
  }

  try {
    // Check Redis cache
    if (PROD) {
      const cachedData = await redisClient.get(name);
      if (cachedData) {
        console.log(`${name} was found in the Redis cache!`);
        return NextResponse.json(JSON.parse(cachedData) as Pokemon);
      } else {
        console.log(
          `${name} was not found in the Redis cache. Fetching from PokeAPI...`
        );
      }
    }

    // Fetch from PokeAPI if not cached
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Failed to fetch from PokeAPI");

    const data = (await response.json()) as Pokemon;
    // Save in cache for 1 hour
    if (PROD) {
      await redisClient.set(name, JSON.stringify(data), { EX: 3600 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
