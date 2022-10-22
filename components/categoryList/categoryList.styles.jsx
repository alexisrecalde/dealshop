import styled from 'styled-components';

export const CategoriesContainer = styled.div`
  padding: 20px 40px;
  margin-top: 40px;

  & .glider-next,
  .glider-prev {
    color: #00bcd4;
  }

  @media screen and (max-width: 900px) {
    padding: 20px;
  }
`;
