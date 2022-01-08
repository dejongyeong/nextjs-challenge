import React from 'react';
import styled from 'styled-components';

function PokemonList({ category, pokemons }) {
  // TODO: create modal
  return (
    <>
      {category === 'all'
        ? pokemons?.results?.map((pokemon) => (
            <Items key={pokemon.name} onClick={() => alert('hello')}>
              {pokemon.name}
            </Items>
          ))
        : pokemons?.pokemon?.map((pokemonbc) => (
            <Items key={pokemonbc.pokemon.name} onClick={() => alert('hello')}>
              {pokemonbc.pokemon.name}
            </Items>
          ))}
    </>
  );
}

export default function Pokemons({
  categories,
  setCategory,
  category,
  pokemonByCategory,
}) {
  const {
    status: pokemonByCategoryStatus,
    data: pokemons,
    error: pokemonByCategoryError,
  } = pokemonByCategory;

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
            type="text"
            id="search"
            name="search"
            placeholder="pikachu"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </SearchWrapper>
      </SearchContainer>
      <ListContainer>
        {pokemonByCategoryStatus === 'loading' ? (
          <div>Loading...</div>
        ) : pokemonByCategoryError === 'error' ? (
          <div>Error...</div>
        ) : (
          <PokemonList category={category} pokemons={pokemons} />
        )}
      </ListContainer>
    </>
  );
}

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 0.9fr;
  gap: 1.5em;
  margin-top: 3%;
  padding: 0.2em;
  font-size: 0.95em;
  width: 100%;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 0.7em;
  align-items: center;
  justify-content: center;
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

const SearchWrapper = styled.div`
  display: flex;
  gap: 0.7em;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
    padding: 7px 40px 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: center;
  grid-gap: 1.2em;
  width: 100%;
  max-width: 100%;
  margin: 1.8em auto 1em auto;
  padding: 1.3em 0;
  height: 80vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
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
  background-color: #f6f6f6;
  border-radius: 0.5em;
  -webkit-box-shadow: 1px 7px 17px -4px rgba(255, 255, 255, 0.41);
  box-shadow: 1px 7px 17px -4px rgba(255, 255, 255, 0.41);
  cursor: pointer;
  &:hover {
    transform: translateY(-0.5rem);
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
`;
