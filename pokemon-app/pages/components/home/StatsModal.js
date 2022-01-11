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
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      width={135}
                      height={135}
                    />
                  </PokemonImage>
                  <PokemonName>{pokemon.name}</PokemonName>
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
              <EvolutionFormsWrapper>
                <h2>Evolution Forms</h2>
                <EvolutionForms>
                  {pokemon.evolutions ? (
                    pokemon.evolutions?.map((evolution) => (
                      <Evolution key={evolution.name}>
                        <Image
                          src={evolution.sprite}
                          alt={evolution.name}
                          width={90}
                          height={90}
                        />
                        <p>
                          #{evolution.id}. {evolution.name}
                        </p>
                      </Evolution>
                    ))
                  ) : (
                    <Evolution>
                      <Image
                        src="/pokeball.svg"
                        alt="pokeball"
                        width={90}
                        height={90}
                      />
                      <p>{pokemon.name} has no evolutions!</p>
                    </Evolution>
                  )}
                </EvolutionForms>
              </EvolutionFormsWrapper>
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
  height: max-content;
  border-radius: 14px;
  padding: 1em 1.5em;
  @media (max-width: 1440.02px) {
    width: 80%;
  }
  @media (max-width: 1024.02px) {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
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

const PokemonInfo = styled.div`
  width: 40%;
  @media (max-width: 768.02px) {
    width: 100%;
  }
`;

const Text = styled.p`
  font-size: 0.87em;
  line-height: 1.5em;
  &:last-child {
    text-transform: capitalize;
  }
`;

const PokemonName = styled.h2`
  margin: 0.1em auto 0.2em auto;
  text-transform: capitalize;
  font-size: clamp(2em, 4vw, 2.4em);
`;

const PokemonImage = styled.div`
  margin: 1.5em auto 0.4em auto;
  text-align: center;
`;

const Type = styled.div`
  color: #ffffff;
  background: ${({ bg }) => bg};
  padding: 0.4em 0.6em;
  margin-top: 0.5em;
`;

const EvolutionFormsWrapper = styled.div`
  font-family: 'Raleway', sans-serif;
  h2 {
    font-size: 1.1em;
  }
  p {
    font-size: 0.95em;
    margin-top: 1em;
  }
`;

const EvolutionForms = styled.div`
  display: flex;
  flex: 1 1 0px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 2.2em auto;
  @media (max-width: 320.02px) {
    display: inline-block;
  }
`;

const Evolution = styled.div`
  margin: 0 auto;
  text-align: center;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  @media (max-width: 320.02px) {
    &:not(:last-child) {
      margin-bottom: 2.5em;
    }
  }
`;
