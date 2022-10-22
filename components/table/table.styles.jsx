import styled from "styled-components";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";

export const Container = styled(TableContainer)`
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #ffffff;
  position: relative;
  z-index: 9;
`;

export const InputValue = styled(TextField)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  div::after {
    border-color: #00bcd4;
  }
`;
