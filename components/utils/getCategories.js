function GetCategories() {
  const getCategoriesById = (id) => {
    switch (id) {
      case 1:
        return "Griferia";
      case 2:
        return "Muebles";
      case 3:
        return "Bachas";
      case 4:
        return "Sanitarios";
      case 5:
        return "Hogar";
      case 6:
        return "Electro";
      case 7:
        return "Aberturas";
    }
  };

  const getSubCategoriesById = (id) => {
    switch (id) {
      case 1:
        return "Cocina";
      case 2:
        return "Repuesto";
      case 3:
        return "Baño";
      case 4:
        return "Baño";
      case 5:
        return "Hogar";
      case 6:
        return "Bacha";
      case 7:
        return "Bañera";
      case 8:
        return "Receptaculo";
      case 9:
        return "Tapa inodoro";
      case 10:
        return "Inodoro";
      case 11:
        return "Deposito";
      case 12:
        return "Bidet";
      case 13:
        return "Lavatorio";
      case 14:
        return "Columna";
      case 15:
        return "Sabanas";
      case 16:
        return "Calefon electrico";
      case 17:
        return "Varios";
      case 18:
        return "Calefaccion";
      case 19:
        return "Varios";
      case 20:
        return "Ventilacion";
      case 21:
        return "Puerta de interior";
      case 22:
        return "Puerta de exterior";
      case 23:
        return "Ventana";
      default:
        return "Varios";
    }
  };

  const getOrderStatusId = (id) => {
    switch (id) {
      case 1:
        return "Pago Aprobado";
      case 2:
        return "Pendiente";
      case 3:
        return "Error";
      case 4:
        return "No pagado";
      case 5:
        return "Error";
      case 6:
        return "En preparacion";
      case 7:
        return "En camino";
      case 8:
        return "Entregado";
    }
  };

  return { getCategoriesById, getSubCategoriesById, getOrderStatusId };
}

export default GetCategories;
