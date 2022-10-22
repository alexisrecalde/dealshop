import { SpinnerContainer, SpinnerOverlay, LogoImage } from "./spinner.styles";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../lotties/97096-loading-dots-pink.json";

// const Spinner = () => (
//   <SpinnerOverlay>
//     <LogoImage src="/img/logo_final.png" alt="logo dealshop" />
//   </SpinnerOverlay>
// );

const Spinner = () => (
  <SpinnerOverlay>
    <Lottie
      animationData={groovyWalkAnimation}
      height={200}
      style={{ width: "600px" }}
    />
  </SpinnerOverlay>
);

export default Spinner;
