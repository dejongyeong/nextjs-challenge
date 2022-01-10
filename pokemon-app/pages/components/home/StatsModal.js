import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { POKEMON_TYPE_COLORS } from '../../utils';
const COLORS = POKEMON_TYPE_COLORS;

const padLeadingZeros = (num, size) => {
  return `#${num.toString().padStart(size, '0')}`;
};

// reference: https://nextjs.org/docs/advanced-features/dynamic-import
// make it into client-side rendering
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
              <PokemonInfoWrapper>
                <PokemonInfo>
                  <Text>{padLeadingZeros(pokemon.id, 4)}</Text>
                  <PokemonImage>
                    {/* use other image if svg not available */}
                    <Image
                      src={
                        pokemon.sprites.other.dream_world.front_default
                          ? pokemon.sprites.other.dream_world.front_default
                          : pokemon.sprites.other['official-artwork']
                              .front_default
                      }
                      alt={pokemon.name}
                      width={125}
                      height={125}
                    />
                  </PokemonImage>
                  <TextHeader>{pokemon.name}</TextHeader>
                  <Text>
                    <b>Weight:</b> {pokemon.weight} kg
                  </Text>
                  <Text>
                    <b>Height:</b> {pokemon.height} m
                  </Text>
                  <PokemonTypeWrapper>
                    {pokemon.types.map((items) => (
                      <Type key={items.slot} bg={COLORS[`${items.type.name}`]}>
                        <Text>{items.type.name}</Text>
                      </Type>
                    ))}
                  </PokemonTypeWrapper>
                </PokemonInfo>
                <RadarChart stats={pokemon.stats} />
              </PokemonInfoWrapper>
              <HorizontalLine />
              <EvolutionFormWrapper>
                <TextHeader>Evolution Forms</TextHeader>
              </EvolutionFormWrapper>
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
  width: 40%;
  height: 69%;
  border-radius: 14px;
  padding: 1em 1.5em;
  @media (max-width: 1440.02px) {
    width: 70%;
  }
  @media (max-width: 1024.02px) {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
  @media (max-width: 768.02px) {
    width: 80%;
  }
  @media (max-width: 425.02px) {
    width: 90%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const ModalBody = styled.div`
  padding-top: 10px;
`;

const HorizontalLine = styled.hr`
  margin: 0.5em auto;
  border-color: #f6f6f6;
`;

const PokemonTypeWrapper = styled.div`
  display: flex;
  flex: 1 1 0px;
  gap: 0.5em;
  margin: 0 auto;
`;

const PokemonInfoWrapper = styled(PokemonTypeWrapper)`
  @media (max-width: 768.02px) {
    display: block;
  }
`;

const Text = styled.p`
  font-size: 0.87em;
  line-height: 1.5em;
  &:last-child {
    text-transform: capitalize;
  }
`;

const TextHeader = styled.h2`
  text-transform: capitalize;
  font-size: clamp(1.2em, 4vw, 2em);
  margin: 0.1em auto 0.2em auto;
  &:last-child {
    font-size: clamp(0.85em, 2.5vw, 1.05em);
  }
`;

const PokemonInfo = styled.div`
  width: 37%;
`;

const PokemonImage = styled.div`
  margin: 1em auto 0.4em auto;
  text-align: center;
`;

const Type = styled.div`
  color: #ffffff;
  background: ${({ bg }) => bg};
  padding: 0.4em 0.6em;
  margin-top: 0.5em;
`;

const EvolutionFormWrapper = styled.div`
  background-color: pink;
`;
