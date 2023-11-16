"use client";

import { Pokemon } from "@/pokemon/types";
import React, { useEffect, useState } from "react";

function CsrFetch() {
  const [pokemonArr, setPokemonArr] = useState<Pokemon[]>([]);
  useEffect(() => {
    (async () => {
      const resp = await fetch("/pokemon.json");
      const data = await resp.json();
      setPokemonArr(data);
    })();
  }, []);

  return (
    <div>
      <h1>Data</h1>
      {pokemonArr && <pre>{JSON.stringify(pokemonArr, null, 2)}</pre>}
    </div>
  );
}

export default CsrFetch;
