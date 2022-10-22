export const mapClientInfo = (state, clientInfo) => {
  switch (clientInfo.tipoDeEntrega) {
    case "ENVIO_A_DOMICILIO":
      return {
        ...state,
        tipoDeEntrega: 1,
        nombreCliente: clientInfo.nombreCliente,
        documentoCliente: clientInfo.documentoCliente,
        telefonoCliente: clientInfo.telefonoCliente,
        idVendedor: null,
        direccionEntrega: clientInfo.direccionEntrega,
        fecha: clientInfo.fecha,
        notas: clientInfo.notas == "" ? "N/A" : clientInfo.notas,
        envioId: clientInfo.envioId,
        distanciaEnvio: clientInfo.distanciaEnvio,
        costoEnvio: clientInfo.costoEnvio,
        floor: clientInfo.floor,
        apartment: clientInfo.apartment,
      };
    case "RETIRO_POR_SUCURSAL":
      return {
        ...state,
        tipoDeEntrega: 2,
        nombreCliente: clientInfo.nombreCliente,
        documentoCliente: clientInfo.documentoCliente,
        idVendedor: null,
        direccionEntrega: null,
        fecha: clientInfo.fecha,
        notas: clientInfo.notas == "" ? "N/A" : clientInfo.notas,
        idSucursal: clientInfo.idSucursal,
      };
    case "VENTA_POR_MOSTRADOR":
      return {
        ...state,
        tipoDeEntrega: 3,
        nombreCliente: clientInfo.nombreCliente,
        documentoCliente: clientInfo.documentoCliente,
        idVendedor: clientInfo.idVendedor,
        direccionEntrega: null,
        fecha: clientInfo.fecha,
        notas: clientInfo.notas == "" ? "N/A" : clientInfo.notas,
        idSucursal: clientInfo.idSucursal,
      };
    default:
      return state;
  }
};

export const mapDeliveryType = (state, deliveryType) => {
  switch (deliveryType) {
    case "ENVIO_A_DOMICILIO":
      return {
        ...state,
        tipoDeEntrega: 1,
      };
    case "RETIRO_POR_SUCURSAL":
      return {
        ...state,
        tipoDeEntrega: 2,
      };
    case "VENTA_POR_MOSTRADOR":
      return {
        ...state,
        tipoDeEntrega: 3,
      };
    default:
      return state;
  }
};
