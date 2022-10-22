import styled from "styled-components";

export const Footer = styled.footer`
  height: 250px;
  position: relative;
  background-color: #e91e62;
  padding: 20px 40px;
  padding-top: 0 !important;
  @media screen and (max-width: 900px) {
    height: auto;
    padding: 18px 20px;
    padding-bottom: 100px !important;
  }
`;

export const ContainerGrid = styled.div`
  display: grid;
  padding: 20px 60px;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  grid-gap: 0px 10px;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
  }
`;

export const SuperTitle = styled.p`
  color: #ffffff;
  font-size: 4rem;
  font-weight: bold;
  margin-block-end: 0;

  @media screen and (max-width: 900px) {
    font-size: 3.5rem;
  }
`;

export const Title = styled.h3`
  color: #ffffff;
  font-size: 1.4rem;
  margin-block-end: 0;
`;

export const List = styled.ul`
  padding-inline-start: 0px;
  margin-bottom: 30px;
`;

export const Text = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  color: #ffffff;
  cursor: pointer;
  margin: 5px;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-block-end: 4rem;
`;

export const IconWrapper = styled.div`
  cursor: pointer;

  & svg {
    color: #ffffff;
    font-size: 2.5rem;
  }
`;
