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

export const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;

  @media screen and (max-width: 900px) {
    grid-template-columns: 90%;
    grid-gap: 20px;
  }
`;

export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 90%;
  grid-gap: 10px 20px;
  align-items: end;
  justify-content: center;

  @media screen and (max-width: 900px) {
    padding: 0 20px;
  }
`;

export const FiltersContainer = styled.div`
  padding: 0 30px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 10px 20px;
  align-items: end;
  justify-content: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 45% 45%;
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

  /* & .MuiOutlinedInput-notchedOutline {
    & :focus {
      border-color: #00bcd4;
    }
  } */

  /* .MuiOutlinedInput-root.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
      border-color: #00bcd4;
    }
  } */
`;

export const RemoveFilters = styled.a`
  text-align: center;
  color: #068fa0;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
`;
