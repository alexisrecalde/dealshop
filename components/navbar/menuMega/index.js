import React, { useState } from "react";
import Fade from "@stahl.luke/react-reveal/Fade";
import { Divider } from "primereact/divider";
import { useRouter } from "next/router";

export default function MenuMega({
  showProductOptions,
  setShowProductOptions,
}) {
  const [dropDownSearch, setDropDownSearch] = useState(false);
  const [dropDownOption, setDropDownOption] = useState(1);
  const router = useRouter();

  const goToGriferias = () => {
    router.push("/productos?category=1").then(() => window.scrollTo(0, 0));
  };
  const goToGriferiasBano = () => {
    router.push("/productos?category=1").then(() => window.scrollTo(0, 0));
  };
  const goToGriferiasCocina = () => {
    router.push("/productos?category=1").then(() => window.scrollTo(0, 0));
  };
  const goHogar = () => {
    router.push("/productos?category=5").then(() => window.scrollTo(0, 0));
  };
  const goVarios = () => {
    router.push("/productos?category=5").then(() => window.scrollTo(0, 0));
  };
  const goSabanas = () => {
    router.push("/productos?category=5").then(() => window.scrollTo(0, 0));
  };
   

  const goTodosProductos = () => {
    router.push("/productos").then(() => window.scrollTo(0, 0));
  };
  const goToElectrodomesticos = () => {
    router.push("/productos?category=6").then(() => window.scrollTo(0, 0));
  };
  const goToCalefaccion = () => {
    router.push("/productos?category=6").then(() => window.scrollTo(0, 0));
  };
  const goToVentilacion = () => {
    router.push("/productos?category=6").then(() => window.scrollTo(0, 0));
  };

  const goToAberturas = () => {
    router.push("/productos?category=7").then(() => window.scrollTo(0, 0));
  };

  const goToPuertas = () => {
    router.push("/productos?category=7").then(() => window.scrollTo(0, 0));
  };

  const goToVentanas = () => {
    router.push("/productos?category=7").then(() => window.scrollTo(0, 0));
  };


  const goToMuebles = () => {
    router.push("/productos?category=2").then(() => window.scrollTo(0, 0));
  };
  const goToMueblesBano = () => {
    router.push("/productos?category=2").then(() => window.scrollTo(0, 0));
  };
  const goToMueblesHogar = () => {
    router.push("/productos?category=2").then(() => window.scrollTo(0, 0));
  };

  const goToSanitarios = () => {
    router.push("/productos?category=4").then(() => window.scrollTo(0, 0));
  };
  const goToBaneras = () => {
    router.push("/productos?category=4").then(() => window.scrollTo(0, 0));
  };
  const goToLavatorios = () => {
    router.push("/productos?category=4").then(() => window.scrollTo(0, 0));
  };


  const optionsProductDropDown = (option) => {
    switch (option) {
      case 1:
        return (
          <>
            <Fade>
              <div className="img-drop" style={{ cursor: "pointer" }} onClick={goToGriferias}></div>

              <div className="sub-categories">
                <div className="drop3 sub-catego-grif-bano-1" onClick={goToGriferiasBano}>
                  Griferia de baño
                </div>

                <div className="drop3 sub-catego-grif-bano-2" onClick={goToGriferiasCocina}>
                  Griferia de cocina
                </div>
              </div>
            </Fade>
            <style jsx>{`
              .img-drop {
                background-image: url("/img/categories/grife.webp");
                width: 300px;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 10px;
              }

              .drop2 {
                background-image: url("/drop2.jpg");
              }
            `}</style>
          </>
        );
      case 2:
        return (
          <>
            <Fade>
              <div className="img-drop hogar-img" style={{ cursor: "pointer" }} onClick={goHogar}>
                Hogar
              </div>
            </Fade>
            <div className="sub-categories">
              <Fade>
                <div className="drop4 drop sub-catego-grif-bano-1" onClick={goVarios}>Varios</div>
              </Fade>
              <Fade>
                <div className="drop5 drop sub-catego-grif-bano-2" onClick={goSabanas}>Sabanas</div>
              </Fade>
            </div>
            <style jsx>{`
              .img-drop {
                background-image: url("/img/categories/grife.webp");
                width: 300px;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 10px;
              }

              .drop2 {
                background-image: url("/drop2.jpg");
              }
            `}</style>
          </>
        );
      case 3:
        return (
          <>
            <Fade>
              <div
                className="img-drop muebles-img"
                style={{ cursor: "pointer" }}
                onClick={goToMuebles}
              >
                Muebles
              </div>
            </Fade>
            <div className="sub-categories">
              <Fade>
                <div className="drop6 drop sub-catego-grif-bano-1" onClick={goToMueblesBano}>
                  Muebles de baño
                </div>
              </Fade>
              <Fade>
                <div className="drop7 drop sub-catego-grif-bano-2" onClick={goToMueblesHogar}>
                  Muebles de hogar
                </div>
              </Fade>
            </div>
            <style jsx>{`
              .img-drop {
                background-image: url("/img/categories/grife.webp");
                width: 300px;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 10px;
              }

              .drop2 {
                background-image: url("/drop2.jpg");
              }
            `}</style>
          </>
        );
      case 4:
        return (
          <>
            <Fade>
              <div
                className="img-drop sanitarios-img"
                style={{ cursor: "pointer" }}
                onClick={goToSanitarios}
              >
                Sanitarios
              </div>
            </Fade>
            <div className="sub-categories">
              <Fade>
                <div className="drop8 drop sub-catego-grif-bano-1" onClick={goToBaneras}>Bañeras</div>
              </Fade>
              <Fade>
                <div className="drop9 drop sub-catego-grif-bano-2" onClick={goToLavatorios}>
                  Lavatorio
                </div>
              </Fade>
            </div>
            <style jsx>{`
              .img-drop {
                background-image: url("/img/categories/grife.webp");
                width: 300px;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 10px;
              }

              .drop2 {
                background-image: url("/drop2.jpg");
              }
            `}</style>
          </>
        );

      case 5:
        return (
          <>
            <Fade>
              <div
                className="img-drop electro-img"
                style={{ cursor: "pointer" }}
                onClick={goToElectrodomesticos}
              >
                Electrodomesticos
              </div>
            </Fade>
            <div className="sub-categories">
              <Fade>
                <div className="drop10 drop sub-catego-grif-bano-1" onClick={goToCalefaccion}>
                  Calefaccion
                </div>
              </Fade>
              <Fade>
                <div className="drop11 drop sub-catego-grif-bano-2" onClick={goToVentilacion}> 
                  Ventilacion
                </div>
              </Fade>
            </div>
            <style jsx>{`
              .img-drop {
                background-image: url("/img/categories/grife.webp");
                width: 300px;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 10px;
              }

              .drop2 {
                background-image: url("/drop2.jpg");
              }
            `}</style>
          </>
        );
      case 6:
        return (
          <>
            <Fade>
              <div
                className="img-drop aberturas-img"
                style={{ cursor: "pointer" }}
                onClick={goToAberturas}
              >
                Aberturas
              </div>
            </Fade>
            <div className="sub-categories">
              <Fade>
                <div className="drop12 drop sub-catego-grif-bano-1" onClick={goToPuertas}>
                  Puertas
                </div>
              </Fade>
              <Fade>
                <div className="drop13 drop sub-catego-grif-bano-2" onClick={goToVentanas}>
                  Ventanas
                </div>
              </Fade>
            </div>
            <style jsx>{`
              .img-drop {
                background-image: url("/img/categories/grife.webp");
                width: 300px;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 10px;
              }

              .drop2 {
                background-image: url("/drop2.jpg");
              }
            `}</style>
          </>
        );
      default:
        return (
          <>
            <Fade>
              <div className="img-drop" style={{ cursor: "pointer" }} onClick={goToGriferias}></div>
            </Fade>
            <div className="sub-categories">
              <Fade>
                <div className="drop3 sub-catego-grif-bano-1" onClick={goToGriferiasBano}>
                  Griferia de baño
                </div>
              </Fade>
              <Fade>
                <div className="drop3 sub-catego-grif-bano-2" onClick={goToGriferiasCocina}>
                  Griferia de cocina
                </div>
              </Fade>
            </div>
            <style jsx>{`
              .img-drop {
                background-image: url("/img/categories/grife.webp");
                width: 300px;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 10px;
              }

              .drop2 {
                background-image: url("/drop2.jpg");
              }
            `}</style>
          </>
        );
    }
  };

  return (
    <>
      {showProductOptions ? (
        <Fade>
          <div
            className="dropdown"
            onMouseOver={() => setShowProductOptions(true)}
            onMouseLeave={() => setShowProductOptions(false)}
          >
            <div className="product-container">
              <nav>
                {/* <h4>COLLECTIONS</h4> */}
                <ul style={{ paddingLeft: "0px" }}>
                  <li onMouseOver={() => setDropDownOption(1)}>
                    <a>Griferias</a>
                  </li>
                  <li onMouseOver={() => setDropDownOption(2)}>
                    <a>Hogar</a>
                  </li>
                  <li onMouseOver={() => setDropDownOption(3)}>
                    <a>Muebles</a>
                  </li>
                  <li onMouseOver={() => setDropDownOption(4)}>
                    <a>Sanitarios</a>
                  </li>
                  <li onMouseOver={() => setDropDownOption(5)}>
                    <a>Electrodomesticos</a>
                  </li>
                  <li onMouseOver={() => setDropDownOption(6)}>
                    <a>Aberturas</a>
                  </li>
                </ul>
              </nav>
              <button className="all-products-button" onClick={goTodosProductos}>
                Ver todos los productos
              </button>
              <Divider layout="vertical" />
            </div>
            <div className="container-faded">
              {optionsProductDropDown(dropDownOption)}
            </div>
          </div>
        </Fade>
      ) : null}
    </>
  );
}
