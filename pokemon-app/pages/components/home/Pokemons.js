import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchSpecificPokemon } from '../../api/useFetch';
import StatsModal from './StatsModal';

const PokemonList = ({
  category,
  pokemons,
  searchValue,
  setPokemonQuery,
  setShowModal,
}) => {
  // TODO: improvement - handle no data message
  return (
    <>
      {category === 'all'
        ? pokemons.results
            .filter((item) => {
              return Object.values(item)
                .join('')
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((filtered) => (
              <Items
                key={filtered.name}
                onClick={() => {
                  setPokemonQuery(filtered.url);
                  setShowModal(true);
                }}
              >
                {filtered.name}
              </Items>
            ))
        : pokemons.pokemon
            .filter((item) => {
              return Object.values(item.pokemon.name)
                .join('')
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((filtered) => (
              <Items
                key={filtered.pokemon.name}
                onClick={() => {
                  setPokemonQuery(filtered.pokemon.url);
                  setShowModal(true);
                }}
              >
                {filtered.pokemon.name}
              </Items>
            ))}
    </>
  );
};

export default function Pokemons({
  categories,
  setCategory,
  category,
  pokemonByCategory,
}) {
  const {
    isLoading: pbcIsLoading,
    isError: pbcIsError,
    data: pokemons,
  } = pokemonByCategory;
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
      <SearchContainer>
        <SelectWrapper>
          <label htmlFor="categories">Categories: </label>
          {typeof window !== 'undefined' && (
            <select
              name="categories"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="all">All</option>
              {categories?.results?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </SelectWrapper>
        <SearchWrapper>
          <label htmlFor="search">Search: </label>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Pikachu"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </SearchWrapper>
      </SearchContainer>
      <ListContainer>
        {pbcIsLoading ? (
          <div>Loading...</div>
        ) : pbcIsError ? (
          <div>Error...</div>
        ) : (
          <>
            <PokemonList
              category={category}
              pokemons={pokemons}
              searchValue={searchValue}
              setPokemonQuery={setPokemonQuery}
              setShowModal={setShowModal}
            />
            {typeof window !== 'undefined' &&
              pokemonQuery &&
              !pqIsLoading &&
              !pqIsError && (
                <StatsModal
                  onClose={() => {
                    setShowModal(false);
                    setPokemonQuery('');
                  }}
                  show={showModal}
                  pokemon={pokemon}
                />
              )}
          </>
        )}
      </ListContainer>
    </>
  );
}

/******************** styled components ************************/

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 0.9fr;
  gap: 1.5em;
  margin: 3rem auto 1em auto;
  padding: 0.2em;
  font-size: 0.95em;
  width: 100%;
  @media (max-width: 600.02px) {
    display: block;
  }
`;

const CommonFlexProperties = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: row;
  gap: 0.7em;
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled(CommonFlexProperties)`
  select {
    text-transform: capitalize;
    width: 100%;
    padding: 7px 40px 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
  }
`;

const SearchWrapper = styled(CommonFlexProperties)`
  input {
    width: 100%;
    padding: 7px 10px 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    ::-webkit-search-cancel-button {
      cursor: pointer;
    }
  }
  @media (max-width: 530.02px) {
    margin-top: 0.8em;
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  justify-content: center;
  align-items: center;
  grid-gap: 1em;
  width: 100%;
  max-width: 100%;
  margin: 1em auto;
  padding: 1.3em 1em;
  height: 75vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  @media (max-width: 425.02px) {
    height: 63vh;
  }
`;

const Items = styled.div`
  color: #000000;
  text-transform: capitalize;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(10px);
  border-radius: 0.5em;
  -webkit-box-shadow: 1px 7px 17px -4px rgba(255, 255, 255, 0.5);
  box-shadow: 1px 7px 17px -4px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &:hover {
    transform: translateY(-0.5rem);
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
`;
