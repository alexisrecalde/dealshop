import React from "react";
import { Dialog } from "primereact/dialog";

export default function LoginError({ setErrorOnLogin, errorOnLogin }) {
  return (
    <Dialog
      className="dialog-finalizar-compra error-modal"
      onHide={() => setErrorOnLogin(false)}
      visible={errorOnLogin}
      // style={{ width: "80%" }}
    >
      <div className="container-felicitaciones">
        <img src="/img/banners/closelog.png" alt="" />
        <div className="felicidades-pago">!Error!</div>
        <div className="compra-realizada-con-exito error-text">
          El usuario o la contraseña son incorrectos. <br/> Ingrese las credenciales
          correctas para continuar.
        </div>
      </div>
    </Dialog>
  );
}
