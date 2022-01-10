import { useEffect, useState } from 'react';

export const POKEMON_TYPE_COLORS = {
  normal: '#a8a77a',
  fire: '#ee8130',
  water: '#6390f0',
  electric: '#f7d02c',
  grass: '#7ac74c',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// this function is used to retrieve window size for managing chart size
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    if (typeof window != 'undefined') {
      function handleResize() {
        setWindowSize({ width: window.innerWidth });
      }

      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowSize;
};
