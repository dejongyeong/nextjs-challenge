import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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
