import React from "react";
// import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function ModalMenorCantidad({
  setShowMenorCantidad,
  showMenorCantidad,
  item,
}) {
  const phoneURL = `https://wa.me/+5401127215538/?text=Hola%20quisiera%20comprar%20el%20producto%20${item.name}!`;
  return (
    <>
      <Dialog
        header="No contamos con stock para este producto!  &#x1F623;"
        visible={showMenorCantidad}
        style={{
          width: "auto",
          height: "auto",
          padding: "5px",
        }}
        className="dialog-no-stock"
        onHide={() => setShowMenorCantidad(false)}
      >
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            // class="fab fa-whatsapp"
            href={phoneURL}
            target="_blank"
          >
            <Button
              className="p-button-rounded p-button-success button-contacto-vendedor"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Comunicate con nosotros!{" "}
              <i class="fab fa-whatsapp" style={{ marginLeft: "5px" }}></i>
            </Button>
          </a>
        </div>
      </Dialog>
    </>
  );
}
