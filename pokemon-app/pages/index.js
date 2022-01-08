import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import useInView from 'react-cool-inview';

import { useFetchCategories, useFetchSpecificCategory } from './api/useFetch';

const Pokemons = dynamic(() => import('./components/home/Pokemons'));

export default function Home() {
  const {
    status: categoriesStatus,
    data: categories,
    error: categoriesError,
  } = useFetchCategories();

  const [category, setCategory] = useState('all');
  const pokemonByCategory = useFetchSpecificCategory(category);

  // TODO: is this work? pagination or lazy loading - come back later
  // reference: https://www.better.dev/lazy-loading-next-js
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(),
  });

  return (
    <MainWrapper>
      <h1>Pokemon Wiki</h1>
      {categoriesStatus === 'loading' ? (
        <MessageContainer>
          <h3>Loading...</h3>
        </MessageContainer>
      ) : categoriesError === 'error' ? (
        <MessageContainer>
          <span>Error: {error.message}</span>
        </MessageContainer>
      ) : (
        <>
          <div ref={observe}>
            {inView && (
              <Pokemons
                categories={categories}
                setCategory={setCategory}
                category={category}
                pokemonByCategory={pokemonByCategory}
              />
            )}
          </div>
        </>
      )}
    </MainWrapper>
  );
}

/******************** styled components ************************/

const MainWrapper = styled.div`
  width: 90%;
  margin: 3% auto;
  color: #ffffff;
  h1 {
    letter-spacing: 0.2rem;
    font-weight: bold;
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5em auto;
`;
