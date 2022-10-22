import React from "react";
import { Dialog } from "primereact/dialog";

export default function Bienvenido({
  startGuide,
  setStartGuide,
  setGuideTourBilletera,
}) {
  return (
    <Dialog
      className="dialog-guide-tour"
      visible={startGuide}
      onHide={() => setStartGuide(false)}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "450px" }}
    >
      <>
        <img src="img/Group 505.png" alt="" className="logo-guide-tour" />
        <div className="title-guide-tour">
          <img src="img/02.png" alt="" />
          <h3>
            <span>Bienvenida/o{' '}</span><span>{"  "}</span>{' '} a DealShop
          </h3>
          <img src="img/01.png" alt="" />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Te contamos que agregamos nuevas funcionaliades. Para verlas, podes
          hacer click en Empezar, o podes saltar la opcion y verlo mas adelante!
        </div>
        <div
          className="container-button-guide-tour"
          style={{ display: "flex" }}
        >
          <button
            onClick={() => {
              localStorage.setItem("step1", 1);
              setStartGuide(false);
            }}
            className="button-ahora-no"
          >
            Ahora no
          </button>
          <button
            onClick={() => {
              setGuideTourBilletera(true);
              setStartGuide(false);
            }}
            className="button-comenzar-guide"
          >
            Empezar!
          </button>
        </div>
      </>
    </Dialog>
  );
}
