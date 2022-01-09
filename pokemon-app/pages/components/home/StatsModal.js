import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { POKEMON_TYPE_COLORS } from '../../utils';

const COLORS = POKEMON_TYPE_COLORS;

const padLeadingZeros = (num, size) => {
  return num.toString().padStart(size, '0');
};

// reference: https://nextjs.org/docs/advanced-features/dynamic-import
const RadarChart = dynamic(() => import('./RadarChart'), { ssr: false });

// Reference: https://devrecipes.net/modal-component-with-next-js/
export default function StatsModal({ show, onClose, pokemon }) {
  const handleCloseClick = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <>
      {show ? (
        <ModalContainer>
          <Modal>
            <ModalHeader>
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
            </ModalHeader>
            <ModalBody>
              <FlexContainer>
                <PokemonInfo>
                  <p>#{padLeadingZeros(pokemon.id, 4)}</p>
                  <h2>{pokemon.name}</h2>
                  <PokemonWH>
                    <b>Weight:</b> {pokemon.weight} kg
                  </PokemonWH>
                  <PokemonWH>
                    <b>Height:</b> {pokemon.height} m
                  </PokemonWH>
                  <FlexContainer>
                    {pokemon.types.map((items) => (
                      <Type key={items.slot} bg={COLORS[`${items.type.name}`]}>
                        <p>{items.type.name}</p>
                      </Type>
                    ))}
                  </FlexContainer>
                </PokemonInfo>
                <PokemonImage>
                  <Image
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </PokemonImage>
              </FlexContainer>
              <hr />
              <RadarChart stats={pokemon.stats} />
            </ModalBody>
          </Modal>
        </ModalContainer>
      ) : null}
    </>
  );
}

/******************** styled components ************************/

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  background: white;
  color: #000000;
  width: 70%;
  height: max-content;
  border-radius: 14px;
  padding: 1em 1.5em;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const ModalBody = styled.div`
  padding-top: 10px;
  hr {
    margin: 1.5em auto 1em auto;
    border-color: #f6f6f6;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex: 1 1 0px;
  gap: 0.6em;
  margin: 0.8em auto 0 auto;
`;

const PokemonInfo = styled.div`
  width: 50%;
  h2 {
    margin: 0.35em auto;
    text-transform: capitalize;
    font-size: 2.5em;
  }
`;

const PokemonWH = styled.p`
  font-size: 0.84em;
  margin-bottom: 0.4em;
`;

const PokemonImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const Type = styled.div`
  color: #ffffff;
  background: ${({ bg }) => bg};
  padding: 0.4em 0.6em;
  border-radius: 1em;
  margin-top: 0.4em;
  p {
    font-size: 0.9em;
    text-transform: capitalize;
  }
`;
