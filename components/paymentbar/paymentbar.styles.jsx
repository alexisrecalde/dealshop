import { styled } from '@mui/material/styles';

export const Container = styled.div`
  padding: 0px 50px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const BarContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 5px 25px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 1px 0 rgba(0, 0, 0, 0.2);
`;

export const ItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 15px;
`;

export const ItemText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #00bcd4;
`;
