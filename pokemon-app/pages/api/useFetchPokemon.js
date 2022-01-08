import axios from 'axios';
import { useQuery } from 'react-query';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export default function useFetchPokemon(name) {
  const uri = name ? `${API_URL}/${name}` : `${API_URL}`;
  return useQuery('pokemon', async () => {
    const { data } = await axios.get(uri);
    return data;
  });
}
