import React from 'react';
import styled from 'styled-components';

import { useFetchCategories } from './api/useFetchCategories';
import useFetchPokemon from './api/useFetchPokemon';
import SearchBar from './components/home/SearchBar';

const Pokemons = () => {};

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
    <MainWrapper>
      <h1>Pokemon Wiki</h1>
      {pokemonStatus === 'loading' || categoriesStatus === 'loading' ? (
        <MessageContainer>
          <h3>Loading...</h3>
        </MessageContainer>
      ) : pokemonError === 'error' || categoriesError === 'error' ? (
        <MessageContainer>
          <span>Error: {error.message}</span>
        </MessageContainer>
      ) : (
        <>
          <SearchBar categories={categories} />
        </>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 90%;
  margin: 3% auto;
  color: #ffffff;
  border: 1px solid black;
  h1 {
    letter-spacing: 0.2rem;
    font-weight: bold;
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5em auto;
`;
