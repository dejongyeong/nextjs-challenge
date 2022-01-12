import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useFetchSpecificCategory,
  useFetchSpecificPokemon,
} from '../pages/api/useFetch.js';
import PokemonList from './PokemonList.js';
import StatsModal from './StatsModal';
import SelectAndSearch from './SelectAndSearch.js';

export default function Pokemons({ categories }) {
  const [category, setCategory] = useState('all');
  const {
    isLoading: pcIsLoading,
    isError: pcIsError,
    data: pokemons,
  } = useFetchSpecificCategory(category);

  const [searchValue, setSearchValue] = useState('');

  // set pokemon query parameter
  const [pokemonQuery, setPokemonQuery] = useState('');
  const {
    isLoading: pqIsLoading,
    isError: pqIsError,
    data: pokemon,
  } = useFetchSpecificPokemon(pokemonQuery);

  // set show modal
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SelectAndSearch
        category={category}
        setCategory={setCategory}
        categories={categories}
        setSearchValue={setSearchValue}
        isError={pcIsError}
      />
      {pcIsLoading ? (
        <MessageContainer>
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </MessageContainer>
      ) : pcIsError ? (
        <MessageContainer>
          <i
            className="fa fa-exclamation-triangle fa-4x"
            aria-hidden="true"
          ></i>
          <span>Error Call to PokeAPI!! Please Try Again Later...</span>
        </MessageContainer>
      ) : (
        <ListContainer>
          <PokemonList
            pokemons={pokemons}
            searchValue={searchValue}
            category={category}
            setPokemonQuery={setPokemonQuery}
            setShowModal={setShowModal}
          />
          {pokemonQuery && !pqIsLoading && !pqIsError && (
            <StatsModal
              onClose={() => {
                setShowModal(false);
                setPokemonQuery('');
              }}
              show={showModal}
              pokemon={pokemon}
            />
          )}
        </ListContainer>
      )}
    </>
  );
}

/******************** styled components ************************/

const ListContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  justify-content: center;
  align-items: center;
  grid-gap: 1em;
  width: 100%;
  max-width: 100%;
  margin: 1.2em auto;
  padding: 1.3em 1em;
  height: 72vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  @media (max-width: 600.02px) {
    height: 62vh;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15% auto;
  i {
    margin-bottom: 0.1em;
  }
`;
