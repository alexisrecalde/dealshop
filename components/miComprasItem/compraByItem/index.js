import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import getConfig from "next/config";
import { createStructuredSelector } from "reselect";
import { selectUserToken } from "../../../redux/user/user.selector";
import { Button } from "primereact/button";
import GetCategories from "../../utils/getCategories";
import { Divider } from "primereact/divider";
import { CurrencyText } from "../../../utils/number.utils";
import { convertDate } from "../../utilsPerFunctions";

const CompraByItem = ({ item }) => {
  const router = useRouter();
  const { getOrderStatusId } = GetCategories();
  const { publicRuntimeConfig } = getConfig();


  return (
    <>
      <>
        <div className="card-compras-info-container">
          <div className="container-image-compra-mis-compras">
            {item.ClientSaleDetail.map((photo) => {
              return (
                <img
                  src={`${publicRuntimeConfig.images_backend_url}${photo.productImage}`}
                  //src={`https://dealshop.com.ar/images${photo.productImage}`}
                  alt={photo.productImage}
                />
              );
            })}
          </div>

          <div className="info-description-compra">
            {item.ClientSaleDetail.map((el) => {
              return <h5> - {el.productName}</h5>;
            })}
            <span className="preparacion-compra">
              {getOrderStatusId(item.clientStatusOrderId)}
            </span>
            {item.deliveryTypeId === 1 ? (
              <span className="fecha-compra" style={{ marginBottom: "10px" }}>
                {item.estimatedDeliveryDate
                  ? `Fecha de entrega ${convertDate(
                      item.estimatedDeliveryDate
                    )} `
                  : "Sin fecha de entrega asignada"}
              </span>
            ) : (
              <span className="fecha-compra" style={{ marginBottom: "10px" }}>
                {item.estimatedDeliveryDate
                  ? `Fecha de retiro ${convertDate(
                      item.estimatedDeliveryDate
                    )} `
                  : "Sin fecha de retiro"}
              </span>
            )}

            <span className="fecha-compra" style={{ marginTop: "auto" }}>
              Cantidad: {item.quantity}{" "}
              <div className="price-total-card-compras">
                Precio total: <CurrencyText value={item.total} />
              </div>
            </span>
          </div>
          <div className="buttons-card-item button-card-compras">
            <Button
              onClick={() =>
                router
                  .push(`/miscompras/${item.id}`)
                  .then(() => window.scrollTo(0, 0))
              }
              label="Ver compra"
              className="p-button-success button-comprar-item-card button-card-micompras"
            />
            <Button
              onClick={() =>
                router
                  .push(`/productos/${item.id}`)
                  .then(() => window.scrollTo(0, 0))
              }
              label="Volver a comprar"
              className="p-button-outlined p-button-success button-agregar-carrito-item-card button-card-micompras"
            />
          </div>
        </div>
        <Divider />
      </>
    </>
  );
};

CompraByItem.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(CompraByItem);
