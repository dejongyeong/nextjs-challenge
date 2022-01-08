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
    const uri =
      category === 'all'
        ? `${API_URL}/pokemon?limit=1181`
        : `${API_URL}/type/${category}`;
    const { data } = await axios.get(uri);
    return data;
  };

  return useQuery(
    ['category', category],
    () => fetchPokemonByCategory(category),
    {
      enabled: Boolean(category),
    }
  );
}

function useFetchSpecificPokemon(name) {
  return useQuery('pokemon', async () => {
    const { data } = await axios.get(`${API_URL}/pokemon/${name}`);
    return data;
  });
}
