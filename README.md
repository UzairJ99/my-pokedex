This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, ensure you have docker installed. Download it from their website. Once installed, run the below command:

```bash
docker build -t mypokedex
```

```bash
docker-compose up
```

Open Docker desktop or use the CLI to ensure the containers are running and then go to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview
The My-Pokédex App is a responsive web application built with Next.js and TypeScript that allows users to search for Pokémon by name and view details such as type, abilities, and base stats. The app fetches data from the PokeAPI, caches responses in Redis to improve performance and reduce API calls, and is containerized using Docker for consistency across development, testing, and production environments. The project is integrated with a CI/CD pipeline for automated testing and deployment, ensuring reliable updates and a smooth development process.

## Key Features
Search Functionality: Users can search for Pokémon by name to retrieve detailed information.

Pokémon Details: Display essential details like type, abilities, height, weight, and stats.

Caching with Redis: Caches data for frequently searched Pokémon to reduce API load and improve response time.

Mobile-First Responsive Design: Adapts seamlessly across various devices and screen sizes.

Automated CI/CD Pipeline: Uses GitHub Actions for continuous integration and deployment, ensuring automated testing and updates.

## Tech Stack
Frontend: Next.js (App Directory), TypeScript, CSS Modules

API: PokeAPI for retrieving Pokémon data

Caching: Redis for storing and caching frequently requested data

Containerization: Docker for consistent environment setup and easy deployment

Testing: Unit tests developed using Jest to test React components such as PokeStat to ensure correct data is being displayed. These tests are also ran on every deployment through the dockerfile.

CI/CD: GitHub Actions for automated builds, tests, and deployments

## Project Goals
Improve Performance: Caching with Redis reduces response times and minimizes API requests. I used lodash as well to debounce API calls. This allows further reduction of API calls on change handlers.

Scalability: Docker enables easy scaling and deployment to various environments.

Streamlined Development: CI/CD pipeline allows automated testing and deployment, minimizing downtime and maintaining code quality.

## Key Notes
The application separates the api fetches from the client side code, which is achieved by having our fetchPokemon function calling the PokeApi in it's own file: [app/api/fetchPokemon/route.ts](https://github.com/UzairJ99/my-pokedex/blob/main/src/app/api/fetchPokemon/route.ts). This allows for separation of concerns so that the page component's job is to only render the UI.

The app is dockerized for easier deployment and security. Two items in particular are dockerized: the My-Pokedex App itself, and Redis. An issue faced when initially connecting the two instances was the application was unable to connect to the Redis host, because Redis was blocking any outside connectivity. To resolve this, I put the redis and my-pokedex containers on the same network. This was done with the configuration code in [docker-compose.yml](https://github.com/UzairJ99/my-pokedex/blob/main/docker-compose.yml). Putting them on the same network allowed them to still be in their own containers while still being able to communicate.

The dockerfile for the application is just a modified copy of the Next.js dockerfile example. The only change needed to be made was adding the `npm test` command to run the automated unit tests before the build step.

To compare results of cached v.s. non-cached fetches, I used console.time() to track the time it takes for each respective function. From the output in the logs, it was clear the cache worked and reduced request time significantly (at least 50% and upto 90% in time reduction).

When code is updated, the docker container needs to be rebuilt. Since we have a docker-compose file, we can just run:
```bash
docker-compose up --build
```

## Upcoming features
AI connectivity to give the user information about how this pokemon (the one being viewed) would match up against another pokemon (second input by the user).