import React from "react";
import getConfig from "next/config";
import { Divider } from "primereact/divider";
import { CurrencyInput, CurrencyText } from "../../../utils/number.utils";

export default function CardItemCart({ item, clearItemFromCart }) {
  const { publicRuntimeConfig } = getConfig();
  let indice = item.name.split(" ");

  return (
    <div className="card-item-cart">
      <div className="delete-item-cart" onClick={() => clearItemFromCart(item)}>
        <i className="pi pi-trash"></i>
      </div>
      <div
        className="container-img-title-card-item-cart"
        style={{ display: "flex" }}
      >
        <img
          src={`${publicRuntimeConfig.images_backend_url}${item.photos[0].image}`}
          alt={`${item.name} dealshop`}
        />
        <h2 style={{ fontSize: "12px" }}>
          {/* {indice.length > 3
            ? `${indice[0]} ${indice[1]} ${indice[2]} ${indice[3]}..`
            : `${item.name}`} */}
          {item.name}
        </h2>
      </div>
      <div className="price-item-card-cart">
        <span>
          {item.quantity} {item.quantity > 1 ? "Unidades" : "Unidad"}
        </span>
        <span>
          {" "}
          <CurrencyText value={item.suggestedPrice} />
        </span>
      </div>
      <Divider style={{ margin: "10px 0" }} />
    </div>
  );
}
