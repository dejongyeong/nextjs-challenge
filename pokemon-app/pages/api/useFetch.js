import axios from 'axios';
import { useQuery } from 'react-query';

const API_URL = 'https://pokeapi.co/api/v2';

export function useFetchCategories() {
  return useQuery('categories', async () => {
    const { data } = await axios.get(`${API_URL}/type`);
    return data;
  });
}

export function useFetchSpecificCategory(category) {
  const fetchPokemonByCategory = async (category) => {
    // TODO: use pagination? this is hard-coded for now - future improvement
    // 898 is the last unique pokemon
    // here we are not using /pokemon-species is because it does have the type info
    const url =
      category === 'all'
        ? `${API_URL}/pokemon?limit=1181`
        : `${API_URL}/type/${category}`;
    const { data } = await axios.get(url);
    return data;
  };

  // query will not execute if url is empty
  return useQuery(
    ['category', category],
    () => fetchPokemonByCategory(category),
    {
      enabled: Boolean(category),
    }
  );
}

export function useFetchSpecificPokemon(url) {
  const fetchSpecificPokemon = async (url) => {
    const { data } = await axios.get(url);
    return data;
  };

  // query will not execute if url is empty
  return useQuery(['pokemon', url], () => fetchSpecificPokemon(url), {
    enabled: Boolean(url),
  });
}
