import { useDebounce } from '../utils/utils';
import styled from 'styled-components';

export default function PokemonList({
  pokemons,
  searchValue,
  category,
  setPokemonQuery,
  setShowModal,
}) {
  const debouncedSearchValue = useDebounce(searchValue, 100); // 100 - delay value
  const data = !debouncedSearchValue.trim()
    ? pokemons
    : pokemons?.filter((item) => {
        return item.name
          .trim()
          .toLowerCase()
          .includes(debouncedSearchValue.toLowerCase());
      });

  return (
    <>
      {data?.length === 0 ? (
        <p>No pokemon found in {category} category...</p>
      ) : (
        data?.map((filtered) => (
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
}

/******************** styled components ************************/

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
  @media (min-width: 768.02px) {
    &:hover {
      transform: translateY(-0.5rem);
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;
    }
  }
`;
