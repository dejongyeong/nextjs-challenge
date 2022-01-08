import React from 'react';
import styled from 'styled-components';

export default function Pokemons() {
  const array = Array(20).fill(undefined);
  return (
    <Container>
      {array.map(() => (
        <Items />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: center;
  grid-gap: 1em;
  width: 100%;
  max-width: 100%;
  margin: 1.8em auto 1em auto;
  padding: 1.3em;
  height: 80vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const Items = styled.div`
  background-color: white;
  color: white;
  padding: 1rem;
  height: 10rem;
`;
