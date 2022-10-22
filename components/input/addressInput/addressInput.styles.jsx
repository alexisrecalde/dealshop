import { styled } from '@mui/material/styles';

export const ApartmentContainer = styled.div`
    display: grid;
    grid-template-columns: 49% 49%;
    grid-gap: 2%;

    @media screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
    }
`;

export const MapFrame = styled.iframe`
    width: 100%;
    margin-top: 5px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);
`;
