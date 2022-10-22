import styled from "styled-components";

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';

export const NavbarContainer = styled(Toolbar)`
  display: grid;
  grid-template-columns: 12% auto 15% 5%;
  grid-gap: 20px;

  @media screen and (max-width: 900px) {
    grid-gap: 15px;
    grid-template-columns: 10% auto 15% 8%;
  }
`;

export const BrandContainer = styled.a`
  display: flex;
  flex-direction: row;
  gap: 5px;

  align-items: flex-end;
`;

export const LogoImage = styled.img`
  max-height: 50px;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    max-height: 40px;
  }
`;

export const BrandTitle = styled(Typography)`
  font-size: 1.4rem !important;

  @media (min-width: 1000px) and (max-width: 1200px) {
    font-size: 0.9rem !important;
  }
  @media (min-width: 901px) and (max-width: 1000px) {
    font-size: 0.75rem !important;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const SearchContainer = styled.form`
  display: flex;
  align-items: center;
`;

export const SearchInputContainer = styled.div`
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px 0px 0px 15px;
  width: 100%;
`;

export const SearchInput = styled(InputBase)`
  width: 100%;
  padding: 5px;

  & .MuiInputBase-input {
    padding-left: 10px;
  }

  @media screen and (max-width: 1000px) {
    & .MuiInputBase-input {
      padding-left: 5px;
    }
  }
`;

export const SearchIconContainer = styled.div`
  background-color: #e91e63;
  font-size: 1.6em;
  padding: 5px 8px;
  border-radius: 0px 15px 15px 0px;
`;

export const CartContainer = styled.a`
  font-size: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    color: #e91e63;
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 0.75rem;
  font-weight: bold;
  bottom: 12px;
  margin-left: 7px;
  color: #ffffff;

  @media screen and (max-width: 900px) {
    font-size: 0.6rem;
    margin-left: 4px;
    bottom: 13px;
  }
`;

export const IconContainer = styled.div`
  margin-left: 5px;
  color: #e91e63;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const MenuContainer = styled(Menu)`
  border-radius: 15px;
  & .MuiMenu-list {
    background-color: #white;
    color: #a1a1a1;
    width: 200px;
    border-radius: 15px;
  }
`;
