import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';

export const ListItemContainer = styled.li`
  display: flex;
  text-transform: capitalize
`;

export const PriceContainer = styled.div`
  padding: 5px 15px 5px 0px;
  display: grid;
  grid-template-columns: 1fr 0.1fr 1fr 0.5fr;
  grid-gap: 5px;
  align-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 0.5fr;

    & span {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const FilterIconContainer = styled.span`
  background-color: #00bcd4;
  padding: 10px;
  border-radius: 15px;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

export const FilterMenu = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 60vw;
    padding: 40px 30px;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;
