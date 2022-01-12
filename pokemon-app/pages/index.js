import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useInView from 'react-cool-inview';
import Image from 'next/image';
import Head from 'next/head';
import Pokemons from './components/home/Pokemons';
import { useFetchCategories } from './api/useFetch';

function HeadTags() {
  return (
    <Head>
      <title>PokeAPI - Cambrean NextJS Coding Challenge</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content="Cambrean Interview Coding Challenge" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Average+Sans&family=Montserrat&family=Open+Sans&family=Raleway&family=Rubik:wght@300;400&display=swap"
        rel="stylesheet"
      />
      {/* font awesome icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
    </Head>
  );
}

export default function Home() {
  const { isLoading, data: categories, isError } = useFetchCategories();

  // TODO: is this work? pagination or lazy loading - come back later
  // reference: https://www.better.dev/lazy-loading-next-js
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(),
  });

  return (
    <>
      <HeadTags />
      <GlobalStyle />
      <HomeContainer>
        <MainWrapper>
          <div style={{ paddingTop: '1em' }}>
            {/* Image from: https://air.inc/logos/pokemon-logo */}
            <Image
              src="/pokemon-logo.svg"
              alt="pokemon logo"
              height={100}
              width={200}
            />
          </div>
          {isLoading ? (
            <MessageContainer>
              <i className="fa fa-spinner fa-spin fa-5x"></i>
            </MessageContainer>
          ) : isError ? (
            <ErrorContainer>
              <i
                className="fa fa-exclamation-triangle fa-5x"
                aria-hidden="true"
              ></i>
              <span>Error Call to PokeAPI!! Please Try Again Later...</span>
            </ErrorContainer>
          ) : (
            <>
              <div ref={observe}>
                {inView && <Pokemons categories={categories} />}
              </div>
            </>
          )}
        </MainWrapper>
      </HomeContainer>
    </>
  );
}

/******************** styled components ************************/

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html,
  body,
  input,
  select {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

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
  height: 80%;
  margin: 0 auto;
  color: #ffffff;
  h1 {
    letter-spacing: 0.2rem;
    font-weight: bold;
    padding-top: 1em;
  }
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ErrorContainer = styled(MessageContainer)`
  span {
    margin-top: 0.5em;
  }
`;
