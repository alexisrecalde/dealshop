import styled from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';

export const FormRadioInput = styled(FormControlLabel)`
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    margin: 0px;
    margin-bottom: 15px;
`;

export const CartForm = styled.div`
    padding: 20px 40px;

    @media screen and (max-width: 900px) {
        padding: 10px;
    }
`;
