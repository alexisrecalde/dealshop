import { styled } from '@mui/material/styles';

export const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OrderStatusesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-right: 15px;

  @media screen and (max-width: 900px) {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    margin-right: 0px;
    padding: 0px 20px;
    justify-content: center;
  }
`;

export const OrderStatusContainer = styled.span`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const OrderStatus = styled.p`
  background-color: ${(props) => props.color};
  padding: 0em 1em;
  font-weight: bold;
  margin: 0em 1em;
  color: #fff;
  border-radius: 50%;
  margin-block-start: 0em;
  margin-block-end: 0em;
  text-align: center;
`;

export const StatusReference = styled.p`
  background-color: ${(props) => props.color};
  font-size: 0.8rem;
  font-weight: bold;
  width: 20px;
  height: 19px;
  color: #fff;
  border-radius: 50%;
  margin-block-start: 0em;
  margin-block-end: 0em;
  text-align: center;
`;

export const StatusReferenceText = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: #00bcd4;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;
