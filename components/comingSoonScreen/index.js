import React from "react";
import { useLottie } from "lottie-react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../lotties/lottiewhite.json";


export default function ComingSoonScreen() {

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100%",
        height: "400px",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        position:"relative"
      }}
      className="container-lottie"
    >
      {/* <img src="img/103144-coming-soon-loader.gif" alt="" /> */}

      <Lottie 
	    animationData={groovyWalkAnimation}
        height={200}
        width={200}
      />
      <h2 style={{ color: "#e91e62", transform: "rotate(356deg) scale(1.5)", position:"absolute" , bottom:"20px"}}>
        Proximamente!
      </h2>
    </div>
  );
}
