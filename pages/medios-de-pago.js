import React from "react";
import { Card } from "primereact/card";

export default function MediosDePago() {
  return (
    <div className="container-medios-de-pago-page">
      <Card className="card-medio-de-pago-page">
        <div className="medio-pago-page">
          <img src="/img/pago/Tarjeta.png" alt="" />
          <span className="title-medio-pago-page">Tarjetas de crédito</span>
          <div className="pago-medio-pago">
            <span className="title-2-medio-pago-page">
              Pagá en 12 cuotas con
            </span>
            <img src="img/pago/Ahora12.png" alt="" className="ahora-12-img" />
          </div>
          <div className="pago-medio-pago img-pagos">
            <img src="/img/pago/TarjetaMaster.png" alt="" />
            <img src="/img/pago/TarjetaVisa.png" alt="" />
          </div>
        </div>
        <div className="medio-pago-page">
          <img src="/img/pago/Tarjeta.png" alt="" />
          <span className="title-medio-pago-page">Tarjetas de débito</span>
          <span className="title-2-medio-pago-page">Con las tarjetas</span>
          <div className="pago-medio-pago img-pagos">
            <img src="/img/pago/TarjetaMaster.png" alt="" />
            <img src="/img/pago/TarjetaVisa.png" alt="" />
          </div>
        </div>
        <div className="medio-pago-page">
          <img src="/img/pago/Billetes.png" alt="" />
          <span className="title-medio-pago-page">Efectivo</span>
          <span className="title-2-medio-pago-page">
            En cualquier sucursal de
          </span>
          <div className="pago-medio-pago img-pagos">
            <img src="/img/pago/Pagofacil.png" alt="" />
          </div>
        </div>
      </Card>
      <Card className="card-medio-de-pago-page">
        <img src="/img/pago/Segurity.png" alt="" />
        <div className="info-compra-protegida" style={{ marginRight: "10%" }}>
          <h3 className="compra-title">Tu compra está protegida</h3>
          <span className="span-compra-protegida">
            Nos hacemos cargo si tenés un problema
          </span>
          <div>
            <ul style={{ paddingLeft: 0 }}>
              <li
              className="li-compra-protegida"
              >
                <i
                  className="pi pi-check "
                  style={{
                    fontSize: "1rem",
                    color: "#E91E63",
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                ></i>
                Sitio web seguro, certificado por Pago con{" "}
                <img
                  src="/img/pago/MercadoPago.png"
                  alt=""
                  style={{ width: "45px" }}
                />
              </li>
              <li
                className="li-compra-protegida"
              >
                <i
                  className="pi pi-check "
                  style={{
                    fontSize: "1rem",
                    color: "#E91E63",
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                ></i>
                Todos nuestros envíos cuentan con seguro total.
              </li>
              <li
                className="li-compra-protegida"
              >
                <i
                  className="pi pi-check "
                  style={{
                    fontSize: "1rem",
                    color: "#E91E63",
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                ></i>
                Garantía oficial de fábrica gestionado por nosotros.
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
