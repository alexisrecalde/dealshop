import React from "react";
import { Dialog } from "primereact/dialog";
import { Timeline } from "primereact/timeline";
import Loader from "../../components/loader";
import getEnvioEvents from "../utils/getEnvioEvents";
import { customizedMarker } from "../utilsPerFunctions/seguimientoUtils";

export default function ModalSeguimiento({
    cardSeguimiento,
    setCardSeguimiento,
    ordenCompra,
    loading,
    status
}) {
  return (
    <>
      <Dialog
        visible={cardSeguimiento}
        onHide={() => setCardSeguimiento(false)}
        className="dialog-seguimiento"
      >
        <div className="container-seguimiento-modal">
          <img src="/img/banners/Camion.png" alt="" style={{ width: "80px" }} />
          <span
            className="title-seguimiento-card-camion"
            style={{ fontSize: "23px" }}
          >
            Detalle de seguimiento
          </span>
          <span className="span-seguimiento-card-camion">
            Tu código de seguimiento es: {ordenCompra.paymentCode}
          </span>
        </div>
        <div>
          {loading && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Loader />
            </div>
          )}
          {!loading && status && (
            <Timeline
              value={getEnvioEvents(status)}
              align="alternate"
              marker={customizedMarker}
              content={(item) => {
                return (
                  <div className="content-item-seguimiento">
                    <small className="p-text-secondary">{item.status}</small>
                    <small className="p-text-secondary">{item.date}</small>
                  </div>
                );
              }}
              style={{ marginRight: "10%" }}
            />
          )}
        </div>
      </Dialog>
    </>
  );
}
