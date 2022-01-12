import styled from 'styled-components';
import Image from 'next/image';
import RadarChart from './RadarChart';

import { POKEMON_TYPE_COLORS } from '../utils/utils';

export default function PokemonInfo({ pokemon }) {
  // NOTE: if using SSR, can the optional '?' be unused? need further understanding of NextJS framework
  const labels = pokemon?.stats.map((stat) => {
    return stat.stat.name.toUpperCase();
  });
  const damages = pokemon?.stats.map((stat) => {
    return stat.base_stat;
  });

  const padLeadingZeros = (num, size) => {
    return `#${num.toString().padStart(size, '0')}`;
  };

  return (
    <PokemonInfoWrapper>
      <PokemonInfoDiv>
        <Text>{padLeadingZeros(pokemon.id, 4)}</Text>
        <PokemonImage>
          {/* use other image if svg not available */}
          <Image
            src={pokemon.sprite ? pokemon.sprite : '/pokemon-logo.svg'}
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
          {pokemon?.types?.map((items) => (
            <Type
              key={items.slot}
              bg={POKEMON_TYPE_COLORS[`${items.type.name}`]}
            >
              <Text>{items.type.name}</Text>
            </Type>
          ))}
        </PokemonTypeWrapper>
      </PokemonInfoDiv>
      <RadarChart label={labels} damages={damages} />
    </PokemonInfoWrapper>
  );
}

/******************** styled components ************************/

const PokemonInfoWrapper = styled.div`
  display: flex;
  flex: 1 1 0px;
  gap: 0.5em;
  margin: 0 auto;
  @media (max-width: 768.02px) {
    display: block;
  }
`;

const PokemonInfoDiv = styled.div`
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
  margin: 1.7em auto;
  text-align: center;
`;

const Type = styled.div`
  color: #ffffff;
  background: ${({ bg }) => bg};
  padding: 0.4em 0.6em;
  margin-top: 0.5em;
`;
