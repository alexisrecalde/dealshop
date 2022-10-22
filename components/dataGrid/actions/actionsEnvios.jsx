import {
  changeStatusOrder,
  changeStatusMultipleOrders,
  deleteOrder,
  patchOrder,
  patchOrderCadetMultiple,
  changeStatusPurchaseOrder,
  changeStatusPurchaseOrderDelivery,
} from "../../../queries/orders/orders.queries";
import {
  orderStatusEnum,
  purchaseStatusEnum,
} from "../../../utils/constants.utils";
import Swal from "sweetalert2";
import { updateProducts } from "../../../queries/products/products.queries";
import { updateFechaEstimadaEntrega } from "../../../queries/users/users.queries";

export const enCamino = async ({ id, authToken, result }) => {
  try {
    await changeStatusOrder({
      id,
      authToken,
      statusId: orderStatusEnum.EN_CAMINO,
      message: result.value,
    });
  } catch (e) {
    throw e;
  }
};

export const enCaminoMultiple = async ({ authToken, body }) => {
  try {
    await changeStatusMultipleOrders({
      authToken,
      body,
    });
  } catch (e) {
    throw e;
  }
};

export const EntregadoMultiple = async ({ authToken, body }) => {
  try {
    await changeStatusMultipleOrders({
      authToken,
      body,
    });
  } catch (e) {
    throw e;
  }
};

export const Entregado = async ({ id, authToken, result }) => {
  try {
    await changeStatusOrder({
      id,
      authToken,
      statusId: orderStatusEnum.ENTREGADO,
      message: result.value,
    });
  } catch (e) {
    throw e;
  }
};

export const EliminarOrdenSinAsignar = async ({ id, authToken, result }) => {
  try {
    await deleteOrder({
      id,
      authToken,
      message: result.value,
    });
  } catch (e) {
    throw e;
  }
};

export const AsignarRepartidorOrdenSinAsignar = async ({
  id,
  authToken,
  cadetId,
}) => {
  //await patchOrder({ id: rowItem.id, authToken, cadetId: getCadetId.cadetId });
  try {
    await patchOrder({
      id,
      authToken,
      cadetId,
    });
  } catch (e) {
    throw e;
  }
};

export const AsignarRepartidorOrdenSinAsignarMultiple = async ({
  id,
  authToken,
  cadetId,
}) => {
  try {
    await patchOrderCadetMultiple({
      id,
      authToken,
      cadetId,
    });
  } catch (e) {
    throw e;
  }
};

export const AsignarVendedor = async ({ id, authToken, rowItem, sellerId }) => {
  try {
    await patchOrder({
      id,
      rowItem,
      authToken,
      sellerId,
    });
  } catch (e) {
    throw e;
  }
};

export const ActualizarProducto = async ({ body, imagesToDelete }) => {
  const deleteImagesFromServer = (imag) => {
    imag.forEach((srcImage) => {
      deleteImage(srcImage);
    });
  };
  try {
    await updateProducts(body).then(() => {
      deleteImagesFromServer(imagesToDelete);
    });
  } catch (e) {
    throw e;
  }
};

//Acciones para ventas directas

export const AsignarRepartidorOrdenSinAsignarVenta = async ({
  id,
  authToken,
  cadetId,
}) => {
  const status = {
    clientStatusOrderId: purchaseStatusEnum.EN_CAMINO,
    cadetId: cadetId,
  };
  try {
    await changeStatusPurchaseOrderDelivery({
      id,
      authToken,
      status,
    });
  } catch (e) {
    throw e;
  }
};

export const EnPreparacionVentaDirecta = async ({ id, authToken }) => {
  const status = {
    clientStatusOrderId: purchaseStatusEnum.EN_PREPARACION,
  };
  try {
    await changeStatusPurchaseOrderDelivery({
      id,
      authToken,
      status,
    });
  } catch (e) {
    throw e;
  }
};

export const EntregadoVentaDirecta = async ({ id, authToken }) => {
  const status = {
    clientStatusOrderId: purchaseStatusEnum.RECIBIDO,
  };
  try {
    await changeStatusPurchaseOrderDelivery({
      id,
      authToken,
      status,
    });
  } catch (e) {
    throw e;
  }
};

export const AsignarEstimadaEntregaFechaVenta = async ({
  id,
  body,
  authToken,
}) => {
  try {
    const response = await updateFechaEstimadaEntrega({
      id,
      body,
      authToken,
    });
    return response;
  } catch (e) {
    throw e;
  }
};
