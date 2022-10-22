import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselOnboarding() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
      paritialVisibilityGutter: 100,
    },
  };
  return (
    <>
      <Carousel
        ssr
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
        className="category-mobile-card-onboarding"
        showDots={false}
        arrows={false}
        infinite={true}
      >
        <div className="cards-ser-vendedor">
          <img src="/img/banners/frametarjeta.png" alt="dealshop seguridad pago" />
          <div>Seguridad en los pagos</div>
          <span>
            Brindá seguridad en los pagos de tus usuarios, concretando cada
            venta a través de Mercado Pago
          </span>
        </div>
        <div className="cards-ser-vendedor card-white">
          <img src="/img/banners/frameshop.png" alt="dealshop vendedores potenciar ventas" />
          <div>Potencias tus ventas</div>
          <span>
            Contamos con publicidad, y somos una plataforma ágil para la
            realización de la compra
          </span>
        </div>
        <div className="cards-ser-vendedor">
          <img src="/img/banners/shipitem.png" alt="dealshop venta segura" />
          <div>Seguridad en los envíos</div>
          <span>
            Las compras llegan en excelentes condiciones, tus envíos son seguros
          </span>
        </div>
        <div className="cards-ser-vendedor card-white">
          <img src="/img/banners/cash.png" alt="dealshop pago efectivo" />
          <div>Pagos en efectivo</div>
          <span>
            Contamos con la posibilidad de abonar sus compras mediante pago
            fácil ó rapipago
          </span>
        </div>
      </Carousel>
    </>
  );
}
