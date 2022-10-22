import styled from 'styled-components';
import Select from '@mui/material/Select';

export const Container = styled.div`
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

export const Header = styled.h3`
  color: #00bcd4;
  margin-block-start: 0px;
`;

export const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 75% 20%;
  grid-gap: 20px;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  grid-gap: 10px;
  align-items: end;
  justify-content: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 49% 49%;
  }
`;

export const FilterHeader = styled.h4`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-bottom: 0.75rem;
`;

export const SelectOption = styled(Select)`
  & .MuiSelect-select {
    padding: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const RemoveFilters = styled.a`
  text-align: center;
  color: #068fa0;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    font-size: 0.9rem;
    margin-bottom: 0px;
  }
`;
