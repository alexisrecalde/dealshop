import styled from 'styled-components';

export const SignFormDiv = styled.div`
  padding: 20px 100px;
  min-height: 52vh;

  @media screen and (max-width: 900px) {
    padding: 10px 15px;
  }
`;

export const Link = styled.div`
  color: #000000;

  &:hover {
    color: #00bcd4;
    cursor: pointer;
  }
`;
