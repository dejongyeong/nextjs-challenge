import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import useInView from 'react-cool-inview';

import { useFetchCategories, useFetchSpecificCategory } from './api/useFetch';

const Pokemons = dynamic(() => import('./components/home/Pokemons'));

export default function Home() {
  const { isLoading, data: categories, isError } = useFetchCategories();

  const [category, setCategory] = useState('all');
  const pokemonByCategory = useFetchSpecificCategory(category);

  // TODO: is this work? pagination or lazy loading - come back later
  // reference: https://www.better.dev/lazy-loading-next-js
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(),
  });

  return (
    <HomeContainer>
      <MainWrapper>
        <h1>Pokemon Wiki</h1>
        {isLoading ? (
          <MessageContainer>
            <h3>Loading...</h3>
          </MessageContainer>
        ) : isError ? (
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
    </HomeContainer>
  );
}

/******************** styled components ************************/

const HomeContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
    344deg,
    rgba(34, 193, 195, 1) 4%,
    rgba(81, 90, 218, 1) 100%
  );
`;

const MainWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  color: #ffffff;
  h1 {
    letter-spacing: 0.2rem;
    font-weight: bold;
    padding-top: 1em;
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5em auto;
`;
