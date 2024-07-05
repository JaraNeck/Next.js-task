"use client";

import PokemonList from "@/components/PokemonList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    </main>
  );
}
