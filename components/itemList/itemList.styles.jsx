import styled from "styled-components";

export const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 950px) {
    overflow-x: hidden;
    display: flex;
  }
`;
