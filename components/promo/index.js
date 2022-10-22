import Link from "next/link";
import React from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

export default function Promo() {
  const router = useRouter();
  const goToOnboarding = () => {
    router.push("/onboarding").then(() => window.scrollTo(0, 0));
  };

  return (
    <>
      {/* <div
        style={{ backgroundColor: "white", display: "flex", height: "450px" }}
      >
        <div>
          <h4 style={{ fontSize: "20px" }}>Aumenta tus ventas</h4>
          <p>
            Hoy podes vender desde nuestro sitio web, <br />
            brindando seguridad en la venta y entrega <br />a tus clientes.
          </p>
          <Button
            className="button-slide sign-in-button p-button-info seller-button"
            onClick={goToOnboarding}
          >
            Quiero ser vendedor
          </Button>
        </div>
        <img src="/img/categories/port.png" alt="" />
      </div> */}
      <div className="sell-container">
        <Button
          className="button-slide sign-in-button p-button-info seller-button"
          onClick={goToOnboarding}
        >
          Quiero ser vendedor
        </Button>
      </div>
    </>
  );
}
