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

async function fetchAllPokemons() {
  const data = await axios
    .get(`${API_URL}/pokemon?limit=1181`)
    .then((response) => {
      return response.data?.results;
    });
  return data;
}

async function fetchSpecificCategoryPokemons(category) {
  const data = await axios
    .get(`${API_URL}/type/${category}`)
    .then((response) => {
      return response.data?.pokemon?.map((pok) => {
        return pok.pokemon;
      }, {});
    });
  return data;
}

// TODO: can we use pagination here? this is hard-coded for now
// here we are not using /pokemon-species route because it does not have the type info
// since the api route is different, we can handle it here before return back to components
export function useFetchSpecificCategory(category) {
  const fetchPokemonByCategory = async (category) => {
    return category === 'all'
      ? fetchAllPokemons()
      : fetchSpecificCategoryPokemons(category);
  };

  return useQuery(
    ['category', category],
    () => fetchPokemonByCategory(category),
    {
      enabled: Boolean(category), // query will not execute if url is empty
    }
  );
}

// reason to flatten the json keys is to get look through sub keys and filter the keys that includes a specific string
// then use the keys to retrieve pokemon evolution name. Also, if in future there's a 3rd or 4th evolution added, we can just
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
        : result.data.sprites.other['official-artwork'].front_default
        ? result.data.sprites.front_default
        : null,
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

    // sprites multiple entry
    return {
      id: data.id,
      sprite: data.sprites.other.dream_world.front_default
        ? data.sprites.other.dream_world.front_default
        : data.sprites.other['official-artwork'].front_default
        ? data.sprites.front_default
        : null,
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
