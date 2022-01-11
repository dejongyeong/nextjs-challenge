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

const extractPokemonEvolutionName = (evolution) => {
  console.log(
    evolution.data?.chain['evolves_to'][0].evolves_to[0].species.name
  );
  const path = evolution.data?.chain['evolves_to'];
  // optional chaining operator to avoid error
  // flatten references: https://javascript.plainenglish.io/how-to-search-in-nested-json-object-with-javascript-8ccfc957e95e
  const subpaths =
    path?.length === 0
      ? null
      : Object.keys(flatten(path[0])).filter((items) =>
          items.includes('species.name')
        );

  const names = [];
  subpaths?.map((subpath) => {
    const data = subpath.includes('.0.')
      ? subpath.replace(/.0/g, '[0]')
      : subpath;
    console.log(data);
    const name = `evolution.data.chain['evolves_to'][0].` + `${data}`;
    names.push(name); // pokemon name
  });
  console.log(names);
  return names;
};

export function useFetchSpecificPokemon(url) {
  const fetchEvolutions = async (url) => {
    const data = await axios
      .get(url)
      .then((response) => {
        return response.data['evolution_chain'].url;
      })
      .then(async (response) => {
        const evolution = await axios.get(response);
        // according to api doc, the main ['evolves_to'] key will have only 1 item
        // TODO: check the path
        const subpath = extractPokemonEvolutionName(evolution);
        // console.log(`evolution.data.chain['evolves_to']` + subpath[1]);
        return evolution.data.chain['evolves_to'];
      });

    // TODO: use pokemon name to call to /pokemon/[name] api and get the image

    // const res =
    //   data?.length === 0
    //     ? null
    //     : data
    //         .filter((item) => {
    //           return Object.keys(item).join('').includes('species');
    //         })
    //         .reduce((cur, key) => {
    //           return Object.assign(cur, { [key]: data[key] }), {};
    //         });

    // const found = Object.keys(flatten(res)).find(
    //   (key) => flatten(res)[key] === 'species'
    // );

    // res
    //   ? console.log('oops')
    //   : console.log(
    //       Object.keys(flatten(res)).find(
    //         (key) => flatten(res)[key] === 'species'
    //       )
    //     );
    // const rest = (o, s) =>
    //   [o] == o ||
    //   Object.keys(o).map((k) => f(o[k], (k = s ? s + [, k] : k), print(k)));
    // console.log(res);
  };

  const fetchSpecificPokemon = async (url) => {
    const { data } = await axios.get(url);
    fetchEvolutions(data.species.url);
    return data;
  };

  // query will not execute if url is empty
  return useQuery(['pokemon', url], () => fetchSpecificPokemon(url), {
    enabled: Boolean(url),
  });
}
