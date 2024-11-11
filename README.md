This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview
The My-Pokédex App is a responsive web application built with Next.js and TypeScript that allows users to search for Pokémon by name and view details such as type, abilities, and base stats. The app fetches data from the PokeAPI, caches responses in Redis to improve performance and reduce API calls, and is containerized using Docker for consistency across development, testing, and production environments. The project is integrated with a CI/CD pipeline for automated testing and deployment, ensuring reliable updates and a smooth development process.

## Key Features
Search Functionality: Users can search for Pokémon by name or ID to retrieve detailed information.

Pokémon Details: Display essential details like type, abilities, height, weight, and stats.

Caching with Redis: Caches data for frequently searched Pokémon to reduce API load and improve response time.

Mobile-First Responsive Design: Adapts seamlessly across various devices and screen sizes.

Automated CI/CD Pipeline: Uses GitHub Actions for continuous integration and deployment, ensuring automated testing and updates.

## Tech Stack
Frontend: Next.js (App Directory), TypeScript, CSS Modules

API: PokeAPI for retrieving Pokémon data

Caching: Redis for storing and caching frequently requested data

Containerization: Docker for consistent environment setup and easy deployment

CI/CD: GitHub Actions for automated builds, tests, and deployments

## Project Goals
Improve Performance: Caching with Redis reduces response times and minimizes API requests.

Scalability: Docker enables easy scaling and deployment to various environments.

Streamlined Development: CI/CD pipeline allows automated testing and deployment, minimizing downtime and maintaining code quality.