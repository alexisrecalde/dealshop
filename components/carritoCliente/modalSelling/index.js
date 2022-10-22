import React from "react";
import { Dialog } from "primereact/dialog";

export default function ModalSelling({
  preSellDetail,
  modalSell,
  setModalSell,
}) {
  return (
    <Dialog
      header="Estas a un paso de finalizar tu compra"
      visible={modalSell}
      style={{ width: "50vw" }}
      onHide={() => setModalSell(false)}
    >
      <div>
        <div>
          Te enviaremos a un sitio seguro donde podras pagar tus productos!
        </div>
        <div></div>
        <a href={preSellDetail.link}>Ir a mercado pago</a>
      </div>
    </Dialog>
  );
}
