export const orderStatusEnum = {
  NUEVO: 1,
  EN_CAMINO: 2,
  ENTREGADO: 3,
  DEVUELTO: 4,
  CANCELADO: 5,
};

export const userTypesEnum = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  VENDEDOR: 3,
  DEPOSITO: 4,
  REPARTIDOR: 5,
};

export const deliveryTypeEnum = {
  ENVIO_A_DOMICILIO: 1,
  RETIRO_POR_SUCURSAL: 2,
  VENTA_POR_MOSTRADOR: 3,
};

export const deliveryVehicle = {
  CAMIONETA: 'camioneta',
  MOTO: 'moto',
};

export const purchaseStatusEnum = {
  APROBADO: 1,
  PENDIENTE: 2,
  ERROR: 3,
  SIN_ACCION: 4,
  ERROR_CAMBIO_ESTADO: 5,
  EN_PREPARACION: 6,
  EN_CAMINO: 7,
  RECIBIDO: 8,
};