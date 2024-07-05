"use client";

import { Pokemon } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonList = () => {
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     const response = await fetch("/api/pokemons");
  //     const data = await response.json();
  //     setPokemons(data);
  //   };
  //   fetchInitialData();
  // });

  const fetchPokemons = async (): Promise<Pokemon[]> => {
    const response = await fetch("/api/pokemons");
    return response.json();
  };

  const {
    data: pokemons,
    isPending,
    isError,
  } = useQuery<Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    staleTime: 60000, // 1분 이내로 캐시된 결과를 사용
  });

  // console.log("pokemon", pokemons);

  if (isPending) {
    return <div>로딩중입니다....</div>;
  }

  if (isError) {
    return <div>에러났어요....</div>;
  }

  return (
    <div className="container mx-auto">
      {pokemons.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-xl font-semibold">불러오는 중입니다..</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="p-4 border border-black rounded-lg"
            >
              <Link href={`/pokemon/${pokemon.id}`}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.korean_name}
                  width={96}
                  height={96}
                />
                <p>{pokemon.korean_name}</p>
                <p>도감번호: {pokemon.id}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
