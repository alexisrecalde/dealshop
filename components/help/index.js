import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import Collapsible from "react-collapsible";

export default function Help({ help }) {
  const [mobileView, setMobileView] = useState(false);
  const [openPreguntas1, setOpenPreguntas1] = useState(false);
  const [openPreguntas2, setOpenPreguntas2] = useState(false);
  const [openPreguntas3, setOpenPreguntas3] = useState(false);
  const [openPreguntas4, setOpenPreguntas4] = useState(false);
  const [openPreguntas5, setOpenPreguntas5] = useState(false);
  const [openPreguntas6, setOpenPreguntas6] = useState(false);
  const [openPreguntas7, setOpenPreguntas7] = useState(false);
  const [openPreguntas8, setOpenPreguntas8] = useState(false);
  const [openPreguntas9, setOpenPreguntas9] = useState(false);
  const [openPreguntas10, setOpenPreguntas10] = useState(false);
  const [openPreguntas11, setOpenPreguntas11] = useState(false);

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
    <>
      {mobileView || help ? (
        <div className="container-mobile" style={{ padding: "10px" }}>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas1(!openPreguntas1)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Cómo funciona el sistema DealShop?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas1 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas1}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                El sistema DEALSHOP funciona de la siguiente manera: El sistema
                DEALSHOP no requiere de inversión alguna por parte de los
                usuarios registrados como vendedores o sub-vendedores. Les
                proporcionamos dos listas de precios a todos los vendedores
                líderes, una de ellas con el precio de costo de los productos a
                publicar. La otra lista proporciona el precio sugerido con los
                que recomendamos se publiquen los productos ofrecidos por
                DEALSHOP. Una vez realizada la venta se cargan en
                www.dealshop.com.ar (previamente deben registrarse para poder
                acceder al servicio), Luego de cargar el/los pedido(s) demorarán
                entre 24 y 48 horas en ser entregados. En el 90% de los casos
                son entregados en 24 horas. Luego de efectivizar dicha venta en
                el módulo "mis pedidos" pueden chequear si el/los mismo(s) fue o
                fueron entregado(s) con éxito y por consiguiente en el módulo
                "billetera virtual" podrán ver reflejadas las ganancias
                correspondientes.
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas2(!openPreguntas2)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Como sé si hay stock de lo que estoy publicando?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas2 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas2}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                El stock real de productos fitura en el inicio de la web
                ingrensando con contraseña en www.dealshop.com.ar
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas3(!openPreguntas3)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    Descripción de productos
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas3 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas3}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas">
                Cada producto publicado en www.dealshop.com.ar cuenta con foto y
                descripción que pueden ser descargadas por el usuario.
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas4(!openPreguntas4)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Cuánto demoran en entregar los pedidos?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas4 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas4}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                Los pedidos ingresados en sistema demorarán en ser entregados
                entre 24 y 48 horas dependiendo del stock y de la distancia de
                donde deba ser realizada la entrega.
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas5(!openPreguntas5)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Cuáles son los costos de los envíos?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas5 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas5}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                Los costos de los envíos pueden ser calculados en la tabla de
                envíos que figura en www.dealshop.com.ar
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas6(!openPreguntas6)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Tengo que estar registrado en AFIP para poder ser vendedor?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas6 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas6}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                Sí. Deben estar registrados como monotributistas en la categoría
                más alta (o según corresponda dependiendo del nivel de ventas de
                cada vendedor).
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas7(!openPreguntas7)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Cuándo cobro mis ganancias?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas7 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas7}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                Las ganancias se hacen efectivas una vez entregados y cobrados
                todos los pedidos hasta el día jueves de cada semana. Las cuales
                son abonadas los días viernes de cada semana.
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas8(!openPreguntas8)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Puedo invertir en dealshop?{" "}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas8 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas8}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                DEALSHOP te da la posibilidad de que ingreses productos que no
                estén en el catálogo de productos ofrecidos, obteniendo así
                ganancia sobre los mismos. Ver punto 6.8 de los términos y
                condiciones en www.dealshop.com.ar
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas9(!openPreguntas9)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Cuánto demoran en despachar los envíos al interior?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas9 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas9}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                Los envíos al interior serán despachados en 72 hs (aprox.)
                después de haber sido cargados en www.dealshop.com
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas10(!openPreguntas10)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Se cambia la mercadería en caso que haya alguna falla?
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas10 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas10}
          >
            <div style={{ marginTop: "10px " }}>
              <p className="texto-preguntas texto-preguntas-lef">
                Si. Previo a realizar el cambio deben solicitar fotos y videos
                en donde se pueda ver la falla del artículo que se haya
                entregado, en caso de no tener evidencia de la falla el cambio
                NO puede ser realizado. Una vez constatada dicha falla o
                faltante se realizará el cambio en 48/72 hs.
              </p>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <div
                className="container-help-preg"
                onClick={() => setOpenPreguntas11(!openPreguntas11)}
              >
                <div className="title-contain-row title-categoria-display-menu">
                  <span className="span-item-menu-display">
                    ¿Qué pasa si el cliente no recibe la mercadería por factores
                    ajenos a la misma? (Ej. no le gustó, no era lo que esperaba,
                    etc)
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#64748B"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline
                      className="arrow"
                      //points="18 15 12 9 6 15"
                      points={
                        !openPreguntas11 ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openPreguntas11}
          >
            <div style={{ marginTop: "10px" }}>
              <p className="texto-preguntas texto-preguntas-lef">
                En ese caso deberá abonar los gastos del envío. En caso que no
                quiera abonarlo deberá pagarlo el vendedor que haya cargado el
                pedido en el sistema. (Sin excepción)
              </p>
            </div>
          </Collapsible>
        </div>
      ) : (
        <div className="container-preguntas-frecuentes">
          <h2 className="title-compras">Preguntas frecuentes</h2>
          <Card className="card-preguntas-frecuentes">
            <h4 className="title-preguntas">
              ¿Cómo funciona el sistema DealShop?
            </h4>
            <p className="texto-preguntas">
              El sistema DEALSHOP funciona de la siguiente manera: El sistema
              DEALSHOP no requiere de inversión alguna por parte de los usuarios
              registrados como vendedores o sub-vendedores. Les proporcionamos
              dos listas de precios a todos los vendedores líderes, una de ellas
              con el precio de costo de los productos a publicar. La otra lista
              proporciona el precio sugerido con los que recomendamos se
              publiquen los productos ofrecidos por DEALSHOP. Una vez realizada
              la venta se cargan en www.dealshop.com.ar (previamente deben
              registrarse para poder acceder al servicio), Luego de cargar
              el/los pedido(s) demorarán entre 24 y 48 horas en ser entregados.
              En el 90% de los casos son entregados en 24 horas. Luego de
              efectivizar dicha venta en el módulo "mis pedidos" pueden chequear
              si el/los mismo(s) fue o fueron entregado(s) con éxito y por
              consiguiente en el módulo "billetera virtual" podrán ver
              reflejadas las ganancias correspondientes.
            </p>
            <br />
            <h4 className="title-preguntas">
              ¿Como sé si hay stock de lo que estoy publicando?
            </h4>
            <p className="texto-preguntas">
              El stock real de productos fitura en el inicio de la web
              ingrensando con contraseña en www.dealshop.com.ar
            </p>
            <br />
            <h4 className="title-preguntas">Descripción de productos</h4>
            <p className="texto-preguntas">
              Cada producto publicado en www.dealshop.com.ar cuenta con foto y
              descripción que pueden ser descargadas por el usuario.
            </p>
            <br />
            <h4 className="title-preguntas">
              ¿Cuánto demoran en entregar los pedidos?
            </h4>
            <p className="texto-preguntas">
              Los pedidos ingresados en sistema demorarán en ser entregados
              entre 24 y 48 horas dependiendo del stock y de la distancia de
              donde deba ser realizada la entrega.
            </p>
            <br />
            <h4 className="title-preguntas">
              ¿Cuáles son los costos de los envíos?
            </h4>
            <p className="texto-preguntas">
              Los costos de los envíos pueden ser calculados en la tabla de
              envíos que figura en www.dealshop.com.ar
            </p>
            <br />
            <h4 className="title-preguntas">
              ¿Tengo que estar registrado en AFIP para poder ser vendedor?
            </h4>
            <p className="texto-preguntas">
              Sí. Deben estar registrados como monotributistas en la categoría
              más alta (o según corresponda dependiendo del nivel de ventas de
              cada vendedor).
            </p>
            <br />
            <h4 className="title-preguntas">¿Cuándo cobro mis ganancias?</h4>
            <p className="texto-preguntas">
              Las ganancias se hacen efectivas una vez entregados y cobrados
              todos los pedidos hasta el día jueves de cada semana. Las cuales
              son abonadas los días viernes de cada semana.
            </p>
            <br />
            <h4 className="title-preguntas">¿Puedo invertir en dealshop?</h4>
            <p className="texto-preguntas">
              DEALSHOP te da la posibilidad de que ingreses productos que no
              estén en el catálogo de productos ofrecidos, obteniendo así
              ganancia sobre los mismos. Ver punto 6.8 de los términos y
              condiciones en www.dealshop.com.ar
            </p>
            <br />
            <h4 className="title-preguntas">
              ¿Cuánto demoran en despachar los envíos al interior?
            </h4>
            <p className="texto-preguntas">
              Los envíos al interior serán despachados en 72 hs (aprox.) después
              de haber sido cargados en www.dealshop.com
            </p>
            <br />
            <h4 className="title-preguntas">
              ¿Se cambia la mercadería en caso que haya alguna falla?
            </h4>
            <p className="texto-preguntas">
              Si. Previo a realizar el cambio deben solicitar fotos y videos en
              donde se pueda ver la falla del artículo que se haya entregado, en
              caso de no tener evidencia de la falla el cambio NO puede ser
              realizado. Una vez constatada dicha falla o faltante se realizará
              el cambio en 48/72 hs.
            </p>
            <br />
            <h4 className="title-preguntas">
              ¿Qué pasa si el cliente no recibe la mercadería por factores
              ajenos a la misma? (Ej. no le gustó, no era lo que esperaba, etc)
            </h4>
            <p className="texto-preguntas">
              En ese caso deberá abonar los gastos del envío. En caso que no
              quiera abonarlo deberá pagarlo el vendedor que haya cargado el
              pedido en el sistema. (Sin excepción)
            </p>
            <br />
          </Card>
        </div>
      )}
    </>
  );
}
