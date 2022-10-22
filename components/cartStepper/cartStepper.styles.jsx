import styled from 'styled-components';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

export const CartStepper = styled(Stepper)`
  background-color: #f3f3f3;
  padding-top: 15px;
  padding-bottom: 5px;
  padding-left: 0px;
  padding-right: 0px;
`;

export const CartStep = styled(Step)`
  .MuiStepIcon-root.MuiStepIcon-completed {
    color: #00bcd4;
  }

  .MuiStepIcon-root.MuiStepIcon-active {
    color: #1392a2;
  }
`;
