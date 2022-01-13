import styled from 'styled-components';
import Image from 'next/image';

export default function PokemonEvolutions({ pokemon }) {
  return (
    <EvolutionFormsWrapper>
      <h2>Evolution Forms</h2>
      <EvolutionForms>
        {pokemon.evolutions ? (
          pokemon.evolutions?.map((evolution) => (
            <Evolution key={evolution.name}>
              <Image
                src={evolution.sprite ? evolution.sprite : '/pokemon-logo.svg'}
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
            <Image src="/pokeball.svg" alt="pokeball" width={90} height={90} />
            <p>{pokemon.name} has no evolutions!</p>
          </Evolution>
        )}
      </EvolutionForms>
    </EvolutionFormsWrapper>
  );
}

/******************** styled components ************************/

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
  gap: 1.5em;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 1.8em auto;
  padding: 0 0.7em;
  @media (max-width: 1024.02px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
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
  line-height: 1.3em;
  @media (max-width: 320.02px) {
    display: block;
    &:not(:last-child) {
      margin-bottom: 2.5em;
    }
  }
`;
