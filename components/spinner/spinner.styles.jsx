import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #e91e63;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const LogoImage = styled.img`
  max-height: 60px;
  animation-duration: 1.95s;
  animation-iteration-count: infinite;
  transform-origin: bottom;

  animation-name: bounce;
  animation-timing-function: ease;

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.15, 0.85) translateY(0);
    }
    30% {
      transform: scale(0.85, 1.15) translateY(-65px);
    }
    50% {
      transform: scale(1.15, 0.9) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(-7px);
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @media screen and (max-width: 900px) {
    max-height: 55px;
  }
`;
