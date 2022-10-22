import { styled } from '@mui/material/styles';
import { InputText } from '../../input/input.styles';

export const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: unset;
  margin-bottom: 2px;
`;

export const InputQty = styled(InputText)`
  & input {
    text-align: center;
  }
  & p {
    margin-block-start: 0.05rem;
    text-align: center;
  }
`;
