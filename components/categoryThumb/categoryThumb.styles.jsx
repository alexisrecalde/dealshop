import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

export const CategoryImage = styled.img`
  width: 12vw;
  border-radius: 50%;
  transition: 0.2s;
  box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05, 1.05);
    -webkit-transform: scale(1.05, 1.05);
    -moz-transform: scale(1.05, 1.05);
    box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 900px) {
    width: 22vw;
  }
`;

export const CategoryTitle = styled.h3`
  color: #e91e63;
  font-size: 1.3rem;

  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;
