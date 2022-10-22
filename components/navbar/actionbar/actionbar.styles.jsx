import styled from 'styled-components';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

export const Bar = styled(Toolbar)`
  background-color: #e91e63;
  min-height: 40px;
  gap: 25px;
`;

export const SideMenu = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 75vw;
    padding: 40px 30px;
    background-color: #00bcd4;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export const PagesMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: flex-end;
`;

export const LogoImage = styled.img`
  max-height: 60px;

  @media screen and (max-width: 900px) {
    max-height: 50px;
  }
`;

export const BrandTitle = styled(Typography)`
  font-size: 1.5rem !important;
  color: #ffffff;

  @media screen and (max-width: 900px) {
    font-size: 1.2rem !important;
  }
`;

export const MenuItemContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MenuText = styled(Typography)`
  font-size: 1rem !important;
  color: white;

  @media screen and (max-width: 900px) {
    font-size: 1.6rem;
  }
`;

export const MenuIcon = styled.span`
  svg {
    font-size: 1.2rem;
    margin-right: 5px;
  }

  @media screen and (max-width: 900px) {
    svg {
      font-size: 1.6rem;
      margin-right: 5px;
      color: #ffffff;
    }
  }
`;
