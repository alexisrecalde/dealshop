import styled from "styled-components";

export const ItemCard = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 44% 10% 14% 10% 22%;
  grid-gap: 5px;
  align-content: space-between;
  padding: 20px;
  min-height: 375px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #ffffff;
  transition: 0.2s;

  &:hover {
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 900px) {
    grid-template-rows: 40% 10% 18% 10% 16%;
    min-height: 400px;
    padding: 10px;
  }
`;

export const ItemPrice = styled.h3`
  color: #e91e63;
  font-size: 1.5rem;
  margin-block-start: 0;
  margin-block-end: 0;

  @media screen and (max-width: 900px) {
    font-size: 1.3rem;
  }
`;

export const ItemTitle = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  margin-block-start: 0;
  margin-block-end: 0;
  user-select: text;

  @media screen and (max-width: 900px) {
    font-size: 0.87rem;
  }
`;

export const ItemAvailability = styled.p`
  font-style: italic;
  color: #e91e63;
  font-size: 0.85rem;
  margin-block-start: 0;
  margin-block-end: 0px;

  @media screen and (max-width: 900px) {
    font-size: 0.7rem;
  }
`;

export const ItemImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ItemImage = styled.img`
  max-height: 150px;
  /* max-width: 150px; */
  /* border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px; */

  @media screen and (max-width: 900px) {
    max-height: 140px;
  }
`;

export const ItemButton = styled.button`
  color: #ffffff;
  border: none;
  background-color: #00bcd4;
  font-weight: bold;
  border-radius: 20px;
  height: 30px;
`;

export const ItemAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(239 151 180 / 84%) !important;
  border-radius: 10px;
  border: none !important;
`;

export const ItemAmountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

export const ItemQtyInput = styled.input`
  border: none;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  background: transparent;
  color: #ffff;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    color: #22c55e;
    background-color: #22c55e;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 900px) {
    max-width: 30%;
  }
`;
