import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 188, 212);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  position: relative;
  z-index: 5;

  &:hover {
    box-shadow: 0px 2px 7px 5px rgba(0, 0, 0, 0.1);
    background-color: #07a6ba;
  }

  @media screen and (max-width: 900px) {
    padding: 10px;
  }
`;

export const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.8rem;
  text-align: center;
  margin-block-start: 0;
  margin-block-end: 0;

  @media screen and (max-width: 900px) {
    font-size: 1.25rem;
  }
`;


export const CardTitleFecha = styled.h3`
  color: #000;
  font-size: 1.2rem;
  text-align: center;
  margin-block-start: 0;
  margin-block-end: 0;

  @media screen and (max-width: 900px) {
    font-size: 1.25rem;
  }
`;
