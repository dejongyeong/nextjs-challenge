import axios from 'axios';
import { useQuery } from 'react-query';
import flatten from 'flat';

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
    // here we are not using /pokemon-species route because it does have the type info
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

// reason to flatten the json keys is to get look through sub keys and filter the keys that includes a specific string
// then use the keys to retrieve pokemon evolution name. Also, if in future there's a 3rd evolution added, we can just
// extract it from the flatten nested-json. however, this approach has some caveats and might run into performance issues
// reference: https://stackoverflow.com/questions/6393943/convert-a-javascript-string-in-dot-notation-into-an-object-reference
function extractEvolutionForms(path, currPokemon) {
  const subpaths =
    path?.length === 0
      ? null
      : Object.keys(flatten(path)).filter((items) =>
          items.includes('species.name')
        );

  const urls = [];
  subpaths?.map((subpath) => {
    const name = subpath.split('.').reduce((obj, indx) => obj[indx], path); // join into [0][evolves_to][...] format
    urls.push(`${API_URL}/pokemon/${name}`); // pokemon evolution form names
  });

  // get the evolution order right. can also loop inversely
  return urls.filter((url) => !url.includes(currPokemon)).reverse();
}

function loopEvolveForms(results) {
  const forms = [];
  results.map((result) => {
    forms.push({
      id: result.data.id,
      name: result.data.name,
      sprite: result.data.sprites.other.dream_world.front_default
        ? result.data.sprites.other.dream_world.front_default
        : result.data.sprites.other['official-artwork'].front_default,
    });
  });
  return forms;
}

async function fetchEvolutions(url, currPokemon) {
  const data = await axios
    .get(url)
    .then((response) => {
      return response.data['evolution_chain'].url;
    })
    .then(async (response) => {
      const evolution = await axios.get(response);
      const urls = extractEvolutionForms(evolution.data?.chain, currPokemon);
      return urls;
    })
    .then(async (response) => {
      if (response.length === 0) return null;
      // axios deprecated .all function, using Promise.all js new in-built function.
      const evolves = await Promise.all(
        response.map((res) => axios.get(res))
      ).then((results) => {
        return loopEvolveForms(results);
      });
      return evolves;
    });
  return data;
}

export function useFetchSpecificPokemon(url) {
  const fetchSpecificPokemon = async (url) => {
    const { data } = await axios.get(url);
    const evolutions = await fetchEvolutions(
      data.species.url,
      data.species.name
    );

    return {
      id: data.id,
      sprite: data.sprites.other.dream_world.front_default
        ? data.sprites.other.dream_world.front_default
        : data.sprites.other['official-artwork'].front_default,
      name: data.name,
      weight: data.weight,
      height: data.height,
      types: data.types,
      stats: data.stats,
      evolutions: evolutions,
    };
  };

  // query will not execute if url is empty
  return useQuery(['pokemon', url], () => fetchSpecificPokemon(url), {
    enabled: Boolean(url),
  });
}
