import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function DiaglogFelicitaciones({
  congratulations,
  setCongratulations,
  onCongratulationsClose,
}) {
  const renderFooter = (name) => {
    return (
      <div style={{ display: "flex" }}>
        <Button
          label="Volver"
          onClick={() => {
            setCongratulations(false);
            onCongratulationsClose();
          }}
          autoFocus
          className="button-inicio-sesion button-volver-felicidades"
        />
      </div>
    );
  };
  return (
    <>
      {" "}
      <Dialog
        visible={congratulations}
        style={{ width: "500px" }}
        onHide={() => {
          setCongratulations(false);
          onCongratulationsClose();
        }}
        footer={renderFooter(congratulations)}
      >
        <div className="container-felicitaciones">
          <img src="/img/check.png" alt="" />
          <h3>¡Felicitaciones!</h3>
          <div className="div-felicidades-1">Formulario enviado con éxito</div>
          <div className="div-felicidades-2">
            Revisá tu casilla de correo electrónico dentro de los próximos{" "}
            <b>15</b> días, ya que nos comunicaremos por ese medio para darte de
            alta como <b>vendedor de DealShop</b>
          </div>
        </div>
      </Dialog>
    </>
  );
}
