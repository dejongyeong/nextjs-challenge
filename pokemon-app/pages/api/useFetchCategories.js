import axios from 'axios';
import { useQuery } from 'react-query';

const API_URL = 'https://pokeapi.co/api/v2/type';

export function useFetchCategories() {
  return useQuery('categories', async () => {
    const { data } = await axios.get(`${API_URL}`);
    return data;
  });
}

export function useFetchSpecificCategory(category) {
  return useQuery('category', async () => {
    const { data } = await axios.get(`${API_URL}/${category}`);
    return data;
  });
}
