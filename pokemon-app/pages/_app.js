import React from 'react';
import Head from 'next/head';
import * as styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const GlobalStyle = styled.createGlobalStyle`
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
  body {
    height: 100vh;
    background: linear-gradient(
      344deg,
      rgba(34, 193, 195, 1) 4%,
      rgba(81, 90, 218, 1) 100%
    );
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>NextJS Coding Challenge</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Cambrean Interview Coding Challenge"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Average+Sans&family=Montserrat&family=Open+Sans&family=Raleway&family=Rubik:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
