import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

export const ItemDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 100px;
    min-height: 75vh;

    @media screen and (max-width: 900px) {
        gap: 20px;
    }
    @media screen and (max-width: 500px) {
        padding: 30px 10px;
    }
`;

export const RowContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 48%;
    grid-gap: 20px;
    margin-bottom: 20px;

    @media screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export const CarouselContainer = styled(Carousel)`
    width: 100%;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid  rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    & .slide {
        background: #ffffff;
    }

    & .thumbs {
        margin-block-start: 0em;
        padding-inline-start: 0px;
        display: flex;
        justify-content: space-evenly;
    }

    & .thumb {
        width: auto !important;
        margin-right: 0px;
        cursor: pointer;

        & img {
            max-height: 100px !important;
        }
    }

    & .thumb.selected {
        border: 1px solid;
        border-color: rgba(0, 0, 0, 0.3);
    }

    & ul {
        margin-block-end: 0px;
    }

    & li {
        border-radius: 15px;
        border-color: rgba(0, 0, 0, 0.1);
    }

    @media screen and (max-width: 900px) {
        border-radius: 15px;

        & ul {
            width: 300px;
        }

        & .thumbs-wrapper {
            margin: 10px;
        }
    }
`;

export const DataContainer = styled.div`
    padding: 10px 40px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 25% 25% 5% 25% 20%;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 20px;

    @media screen and (max-width: 900px) {
        padding: 10px;
        margin-bottom: 0px;

        & h3 {
            margin-block-start: 0;
        }
    }
`;

export const DescriptionContainer = styled.div`
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    padding: 10px 40px;
    background-color: #ffffff;
    width: 100%;
    border-radius: 0 0 15px 15px;

    & h2 {
        color: #e91e63;
    }

    & hr {
        color: rgba(0, 0, 0, 0.2);
    }

    & p {
        margin-right: 15%;
    }

    @media screen and (max-width: 900px) {
        padding: 10px 20px;
        border-radius: 15px;
    }
`;

export const DescriptionTableContainer = styled.div`
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 10px 40px;
    background-color: #ffffff;
    width: 100%;

    & h2 {
        color: #e91e63;
    }

    & hr {
        color: rgba(0, 0, 0, 0.2);
    }

    & p {
        margin-right: 15%;
    }

    @media screen and (max-width: 900px) {
        padding: 10px 20px;
    }
`;

export const ItemTitle = styled.h3`
    font-size: 1.2rem;
    user-select: text;

    @media screen and (max-width: 900px) {
        font-size: 0.9rem;
    }
`;

export const Price = styled.p`
    font-size: 2em;
    font-weight: bold;
    margin-block-end: 0px;
    margin-block-start: 0px;
    color: #e91e63;

    @media screen and (max-width: 900px) {
      font-size: 1.2rem;
      margin-top: 10px;
    }
`;

export const ItemAvailability = styled.p`
    font-style: italic;
    color: #e91e63;
    font-size: 0.9rem;
    margin-block-start: 0;

    @media screen and (max-width: 900px) {
        font-size: 0.7rem;
    }
`;

export const QtyContainer = styled.span`
    display: grid;
    grid-template-columns: 1fr 0.25fr 1fr 0.25fr 2fr;
    grid-gap: 10px;
    align-items: center;

    @media screen and (max-width: 900px) {
        grid-template-columns: 10% auto 10%;
        grid-gap: 5px;
        margin: 5px 0px;

        & p {
            display: none;
        }
    }
`;

export const ItemQtyInput = styled.input`
    border: none;
    border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.3);
    text-align: center;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    &[type='number'] {
        -moz-appearance: textfield;
    }

    &:focus {
        outline: none;
    }
`;
