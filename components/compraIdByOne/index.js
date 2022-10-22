import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import getConfig from "next/config";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";
import { selectUserToken } from "../../redux/user/user.selector";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import getPurchaseInfo from "../../components/utils/getPurchaseApi";
import Spinner from "../spinner/spinner.component";
import GetCategories from "../../components/utils/getCategories";
import { CurrencyText } from "../../utils/number.utils";
import getEnvioEvents from "../../components/utils/getEnvioEvents";
import { getSeguimiento } from "../../queries/purchase/purchase.queries";
import { convertDate } from "../utilsPerFunctions";
import { customizedMarker } from "../utilsPerFunctions/seguimientoUtils";
import ModalSeguimiento from "../../components/modalSeguimientoEnvio"

const CompraIdByOne = ({ compraId, authToken }) => {
  const router = useRouter();
  const { getMyPurchase } = getPurchaseInfo();
  const [cardSeguimiento, setCardSeguimiento] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState([]);
  const [loadingRender, setLoadingRender] = useState(false);
  const [statusOrder, setStatusOrder] = useState("");
  const { getOrderStatusId } = GetCategories();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    const getProductBuy = async () => {
      setLoadingRender(true);
      try {
        const response = await getMyPurchase(authToken);
        const arrayCompras = response.data.filter((el) => {
          if (el.id === compraId) {
            return el;
          }
        });
        setStatusOrder(arrayCompras[0].clientStatusOrderId);
        setOrdenCompra(arrayCompras[0]);
        setTimeout(() => {
          setLoadingRender(false);
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    };
    getProductBuy();
  }, []);

  const buscarSeguimientoEnvio = async (numero) => {
    setCardSeguimiento(true);
    try {
      setLoading(true);
      const seguimientoSta = await getSeguimiento(numero, authToken);
      if (seguimientoSta.clientStatusOrderId) {
        setStatus(seguimientoSta.clientStatusOrderId);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setStatus(false);
        setLoading(false);
      }
    } catch (e) {
      setStatus(false);
      setLoading(false);
    }
  };

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Mis compras</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Mis compras" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  if (loadingRender) {
    return (
      <div style={{ width: "100%" }}>
        {header()}
        <div
          className=""
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {<Spinner />}
        </div>
      </div>
    );
  }

  if (!loadingRender) {
    return (
      <>
        {ordenCompra.ClientSaleDetail &&
          ordenCompra.ClientSaleDetail.map((el) => {
            return (
              <Card className="container-compra compra-id-foto-info">
                <div className="info-compra-id">
                  <div className="item-compra-ayuda-id">{el.productName}</div>
                  <div className="item-compra-ayuda-id-2">
                    {el.quantity} Unidad
                  </div>
                  <div className="item-compra-ayuda-id-2">
                    <CurrencyText value={el.price} />
                  </div>
                </div>
                <img
                  src={`${publicRuntimeConfig.images_backend_url}${el.productImage}`}
                  alt={el.productName}
                />
              </Card>
            );
          })}
        <Card className="container-compra info-compra-id-seguimiento">
          <div className="info-div-compra-id">
            <span className="estado-envio-compra-id">
              {getOrderStatusId(statusOrder)}
            </span>
            {ordenCompra.deliveryTypeId !== 2 && statusOrder !== 8 ? (
              <span className="fecha-envio-compra-id">
                Codigo de seguimiento{"  "}
                <span
                  onClick={() =>
                    buscarSeguimientoEnvio(ordenCompra.paymentCode)
                  }
                  style={{
                    color: "#4285F4",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                >
                  {ordenCompra.paymentCode}
                </span>
              </span>
            ) : (
              <span className="fecha-envio-compra-id"></span>
            )}
            {statusOrder !== 8 ? (
              ordenCompra.estimatedDeliveryDate !== "" ? (
                <span>
                  La fecha estimada de entrega es:{" "}
                  {convertDate(ordenCompra.estimatedDeliveryDate)}
                </span>
              ) : (
                ""
              )
            ) : (
              <span className="domicilio-envio-compra-id">
                Entregamos tu paquete el dia{" "}
                {convertDate(ordenCompra.estimatedDeliveryDate)} en su
                domicilio!
              </span>
            )}

            <Button
              onClick={() =>
                router
                  .push(
                    `/productos/${ordenCompra.ClientSaleDetail[0].productId}`
                  )
                  .then(() => window.scrollTo(0, 0))
              }
              label="Volver a comprar"
              className="p-button-outlined p-button-success button-agregar-carrito-item-card button-card-micompras button-compra-id"
            />
          </div>
        </Card>
        <Card className="container-compra ayuda-compra-id">
          <span className="item-compra-ayuda-id">Ayuda con la compra</span>
          <Divider />
          <span className="item-compra-ayuda-id-2">
            Opinar sobre el producto
          </span>
          <Divider />
          <span className="item-compra-ayuda-id-2">Contacta con nosotros</span>
        </Card>
        <ModalSeguimiento
          cardSeguimiento={cardSeguimiento}
          setCardSeguimiento={setCardSeguimiento}
          ordenCompra={ordenCompra}
          loading={loading}
          status={status}
        />
      </>
    );
  }
};

CompraIdByOne.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(CompraIdByOne);
