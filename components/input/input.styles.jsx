import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Input from "@mui/material/Input";
//import PasswordField from 'material-ui-password-field';

export const InputTextOutlined = styled(TextField)`
  & input {
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  & .MuiInputLabel-outlined {
    transform: translate(14px, 12px) scale(1);
  }

  & .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.75);
  }

  & .MuiOutlinedInput-input {
    transform: translate(0px, 0px) scale(1);
  }

  & .MuiOutlinedInput-input {
    padding: 10px;
  }

  & .MuiFormLabel-root.Mui-focused {
    color: #00bcd4;
  }

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #00bcd4;
  }
`;

export const InputTextOutlinedFullHeight = styled(TextField)`
  & input {
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  & .MuiFormLabel-root.Mui-focused {
    color: #00bcd4;
  }

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #00bcd4;
  }
`;

export const InputText = styled(Input)`
  text-align: center;
  margin-bottom: 10px;

  & input {
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  & .MuiFormLabel-root.Mui-focused {
    color: #00bcd4;
  }

  & .MuiInput-underline:after {
    border-color: #00bcd4;
  }
`;

export const InputContainer = styled(FormControl)`
  & .MuiFormLabel-root.Mui-focused {
    color: #00bcd4;
  }

  & .MuiInput-underline:after {
    border-color: #00bcd4;
  }

  & .MuiOutlinedInput-root.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
      border-color: #00bcd4 !important;
    }
  }
`;

export const InputPasswordField = styled(TextField)`
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;

  & :after {
    border-bottom-color: #00bcd4;
  }
`;
