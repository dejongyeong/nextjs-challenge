import React from 'react';
import styled from 'styled-components';

import { useFetchCategories } from './api/useFetchCategories';
import useFetchPokemon from './api/useFetchPokemon';
import SearchBar from './components/home/SearchBar';

const Pokemons = () => {};

const Wrapper = styled.div`
  width: 90%;
  margin: 3% auto;
  color: #ffffff;
  h1 {
    letter-spacing: 0.2rem;
    font-weight: bold;
  }
`;

export default function Home() {
  const {
    status: pokemonStatus,
    data: pokemon,
    error: pokemonError,
  } = useFetchPokemon();
  const {
    status: categoriesStatus,
    data: categories,
    error: categoriesError,
  } = useFetchCategories();

  return (
    <Wrapper>
      <h1>Pokemon Wiki</h1>
      {pokemonStatus === 'loading' || categoriesStatus === 'loading' ? (
        'Loading...'
      ) : pokemonError === 'error' || categoriesError === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <SearchBar categories={categories} />
        </>
      )}
    </Wrapper>
  );
}
