import React from "react";

export default function MenuShipping() {
  return (
    <div className="container-menu-option-shipping">
      {/* <div className="container-card-option-shipping">
        <img src="img/shippingEnvio.png" alt="" />
        <span className="title-card-option">ENVIOS GRATIS</span>
        <span className="description-card-option">
          En compras superiores a $3500
        </span>
      </div> */}
      <div className="container-card-option-shipping">
        <img src="img/refundReembolso.png" alt="" />
        <span className="title-card-option">100% REEMBOLSO</span>
        <span className="description-card-option">
          En caso de tener problemas con la compra
        </span>
      </div>    
      <div className="container-card-option-shipping">
        <img src="img/supportSoporte.png" alt="" />
        <span className="title-card-option">SOPORTE 24 HS</span>
        <span className="description-card-option">De lunes a viernes</span>
      </div>
    </div>
  );
}
