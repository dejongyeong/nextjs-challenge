import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useFetchSpecificCategory,
  useFetchSpecificPokemon,
} from '../../api/useFetch';
import { useDebounce } from '../../utils';
import StatsModal from './StatsModal';

const PokemonList = ({
  pokemons,
  searchValue,
  setPokemonQuery,
  setShowModal,
}) => {
  const debouncedSearchValue = useDebounce(searchValue, 100); // 100 - delay value
  const data = !debouncedSearchValue.trim()
    ? pokemons
    : pokemons.filter((item) => {
        return item.name
          .trim()
          .toLowerCase()
          .includes(debouncedSearchValue.toLowerCase());
      });

  return (
    <>
      {data.length === 0 ? (
        <p>`{debouncedSearchValue}` not found in pokedex...</p>
      ) : (
        data.map((filtered) => (
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
      )}
    </>
  );
};

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
      <SearchContainer>
        <SelectWrapper>
          <label htmlFor="categories">Categories: </label>
          {typeof window !== 'undefined' && (
            // disable inputs including search if there's error from api call
            <select
              name="categories"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              disabled={pcIsError}
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
            disabled={pcIsError}
          />
        </SearchWrapper>
      </SearchContainer>
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
        </ListContainer>
      )}
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
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled(CommonFlexProperties)`
  select {
    text-transform: capitalize;
    width: 100%;
    margin-top: 0.7em;
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
    height: 34px;
    margin-top: 0.7em;
    padding: 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    ::-webkit-search-cancel-button {
      cursor: pointer;
    }
  }
  @media (max-width: 530.02px) {
    margin-top: 0.85em;
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
  margin: 1.2em auto;
  padding: 1.3em 1em;
  height: 75vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  @media (max-width: 600.02px) {
    height: 62vh;
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
