import React from 'react';
import styled from 'styled-components';
import { POKEMON_TYPE_COLORS } from '../../utils';

const COLORS = POKEMON_TYPE_COLORS;

const padLeadingZeros = (num, size) => {
  return num.toString().padStart(size, '0');
};

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
              <p>#{padLeadingZeros(pokemon.id, 4)}</p>
              <h2>{pokemon.name}</h2>
              <TypeContainer>
                {pokemon.types.map((items) => (
                  <Type key={items.slot} bg={COLORS[`${items.type.name}`]}>
                    <p>{items.type.name}</p>
                  </Type>
                ))}
              </TypeContainer>
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
  text-transform: capitalize;
  h2 {
    margin-top: 0.35em;
  }
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 0.6em;
  margin: 0.8em auto 0 auto;
`;

const Type = styled.div`
  color: #ffffff;
  background: ${({ bg }) => bg};
  padding: 0.4em;
  border-radius: 1em;
  p {
    font-size: 0.9em;
  }
`;
