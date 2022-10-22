import styled from 'styled-components';
import { CurrencyText } from '../../../utils/number.utils';

export const HeadContainer = styled.div`
  display: grid;
  grid-template-columns: 55% auto;
  grid-gap: 30px;
  margin-bottom: 5px;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-rows: 47.5% 47.5%;
  grid-gap: 10px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 47.5% 47.5%;
    grid-template-rows: 100%;
  }
`;

export const Icon = styled.img`
  height: 60px;

  @media screen and (max-width: 900px) {
    height: 60px;
  }
`;

export const DetailContainer = styled.div`
  padding: 10px 50px 50px 50px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  @media screen and (max-width: 900px) {
    padding: 15px;
  }
`;

export const DetailTitle = styled.h3`
  color: #00bcd4;
  font-size: 1.5rem;

  @media screen and (max-width: 900px) {
    font-size: 1.3rem;
  }
`;

export const BalanceText = styled(CurrencyText)`
  font-size: 3rem;
  font-weight: bold;
  color: #00bcd4;

  @media screen and (max-width: 900px) {
    font-size: 2.25rem;
  }
`;
