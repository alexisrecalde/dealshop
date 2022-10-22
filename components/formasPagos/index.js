import React, { useEffect, useState } from "react";
import Image from "next/image";
import formasPagos from "../../public/img/pago/formas-pagos.png";
import shippingEnvio from "../../public/img/product-package-delivered-icon.png";
import supportSoporte from "../../public/img/supportSoporte.png";

export default function FormasPagos() {
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  return (
    <div className="formas-pagos-home">
      <div className="grid-container">
        <div className="container container-img-pagos">
          <div className="icon-container">
            <Image src={formasPagos} priority={true} width={230} height={28} />
          </div>
          <div>
            <p> Pagá con crédito y débito</p>
            <a
              href="https://www.fravega.com/medios-de-pago"
              className="option-2-formas"
            >
              Ver mas
            </a>
          </div>
        </div>
        <div className="line line-desktop"></div>
        <div className="container">
          <div className="icon-container">
            {mobileView ? (
              <Image
                src={supportSoporte}
                width={25}
                height={30}
                priority={true}
              />
            ) : (
              <Image
                src={supportSoporte}
                width={35}
                height={40}
                priority={true}
              />
            )}
          </div>
          <div>
            <p>Atencion al cliente las 24hs</p>
            <a
              href="https://www.fravega.com/medios-de-pago"
              className="option-2-formas"
            >
              Ver mas
            </a>
          </div>
        </div>
        <div className="line"></div>
        <div className="container">
          <div className="icon-container">
            {mobileView ? (
              <Image
                src={shippingEnvio}
                width={30}
                height={30}
                priority={true}
              />
            ) : (
              <Image
                src={shippingEnvio}
                width={45}
                height={45}
                priority={true}
              />
            )}
          </div>
          <div>
            {mobileView ? (
              <p>Envíos y retiro gratis</p>
            ) : (
              <p>Envíos gratis en octubre y retiro gratis</p>
            )}
            <a
              href="https://www.fravega.com/medios-de-pago"
              className="option-2-formas"
            >
              Todo el mes de Octubre!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
