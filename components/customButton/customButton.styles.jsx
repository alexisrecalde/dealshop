import styled from "styled-components";

export const CustomPrimaryButton = styled.button`
  border: none;
  font-weight: bold;
  border-radius: 10px;
  height: 40px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  color: ${(props) => (props.disabled ? "#b04d70" : "#ffffff")};
  background-color: ${(props) => (props.disabled ? "transparent" : "#e91e63")};

  & :focus {
    outline: none;
  }
`;

export const CustomSecondaryButton = styled.button`
  border: none;
  font-weight: bold;
  border-radius: 10px;
  height: 40px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  color: ${(props) => (props.disabled ? "#749699" : " #ffffff")};
  background-color: ${(props) => (props.disabled ? "transparent" : "#00bcd4")};

  & :focus {
    outline: none;
  }
`;

export const CustomSecondaryButtonAgregarNuevo = styled.button`
  border: none;
  height: 45px;
  font-size: 19px;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  color: ${(props) => (props.disabled ? "#ffff" : "#ffff")};
  background-color: ${(props) =>
    props.disabled ? "transparent" : "transparent"};

  & :focus {
    outline: none;
  }
`;
