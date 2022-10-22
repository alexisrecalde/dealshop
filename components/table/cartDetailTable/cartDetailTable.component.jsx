import getConfig from "next/config";

import TableComponent from "../table.component";
import { CurrencyText } from "../../../utils/number.utils";

const CartDetailTableComponent = ({ items, cliente }) => {
  const { publicRuntimeConfig } = getConfig();
  const arrayOfColumns = [
    { id: 1, name: "Producto" },
    { id: 2, name: "" },
    { id: 3, name: "Cantidad" },
    { id: 4, name: "Costo producto" },
    { id: 5, name: "Precio de venta" },
  ];

  const arrayOfColumnsCliente = [
    { id: 1, name: "Producto" },
    { id: 2, name: "Nombre" },
    { id: 3, name: "Cantidad" },
    { id: 5, name: "Precio de venta" },
  ];

  const arrayOfItems = items.map((item) => {
    return {
      imagen: (
        <img
          src={
            item.photos.length < 1
              ? "/img/no-image.png"
              : `${publicRuntimeConfig.images_backend_url}${item.photos[0].image}`
          }
          alt="Imagen del producto"
          style={{ maxHeight: "60px" }}
        />
      ),
      name: item.name,
      quantity: item.quantity,
      precio_sugerido: <CurrencyText value={item.sellingPrice} />,
      precio_venta: <CurrencyText value={item.clientSellingPrice} />,
    };
  });

  const arrayOfItemsCliente = items.map((item) => {
    return {
      imagen: (
        <img
          src={
            item.photos.length < 1
              ? "/img/no-image.png"
              : `${publicRuntimeConfig.images_backend_url}${item.photos[0].image}`
          }
          alt="Imagen del producto"
          style={{ maxHeight: "60px" }}
        />
      ),
      name: item.name,
      quantity: item.quantity,
      precio_venta: <CurrencyText value={item.clientSellingPrice} />,
    };
  });

  return (
    <TableComponent
      columns={cliente ? arrayOfColumnsCliente : arrayOfColumns}
      rows={cliente ? arrayOfItemsCliente : arrayOfItems}
    />
  );
};

export default CartDetailTableComponent;
