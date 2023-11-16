"use client";
import React, { useEffect, useState } from "react";

function CsrAbortController() {
  const [pokemonArr, setPokemonArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create an instance of AbortController
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Pass the signal to the fetch call
        const resp = await fetch("/pokemon.json", { signal });
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        const result = await resp.json();
        setPokemonArr(result);
      } catch (err: any) {
        if (err.name === "AbortError") console.log("Fetch aborted");
        else setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort the fetch when the component unmounts
    return () => {
      controller.abort();
    };
  }, []); // Empty dependency array means this effect will only run once on mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data</h1>
      {pokemonArr && <pre>{JSON.stringify(pokemonArr, null, 2)}</pre>}
    </div>
  );
}

export default CsrAbortController;
