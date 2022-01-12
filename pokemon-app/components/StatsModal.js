import React from 'react';
import styled from 'styled-components';
import PokemonInfo from './PokemonInfo';
import PokemonEvolutions from './PokemonEvolutions';

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
                <i className="fa fa-times fa-xs" aria-hidden="true"></i>
              </a>
            </ModalHeader>
            <ModalBody>
              <PokemonInfo pokemon={pokemon} />
              <HorizontalLine />
              <PokemonEvolutions pokemon={pokemon} />
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
  width: 45%;
  height: max-content;
  border-radius: 14px;
  padding: 1em 1.5em;
  @media (max-width: 1440.02px) {
    width: 70%;
  }
  @media (max-width: 768.02px) {
    height: 80%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const ModalBody = styled.div`
  padding-top: 10px;
  height: 95%;
  @media (max-width: 1024.02px) {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
`;

const HorizontalLine = styled.hr`
  margin: 0.5em auto;
  border-color: #f6f6f6;
`;
