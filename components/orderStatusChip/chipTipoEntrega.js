const switchTipoEntrega = (tipoDeEntrega) => {
  switch (tipoDeEntrega) {
    case 1:
      return "Envío a domicilio";
    case 2:
      return "Retiro por sucursal";
    case 3:
      return "Venta por mostrador";
    default:
      return "N/A";
  }
};

export default switchTipoEntrega;
