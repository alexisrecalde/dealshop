import { ChipOrder } from "./chipOrder";

const switchStatusOrder = (param) => {
  switch (param) {
    case 1:
      return <ChipOrder type="Nuevo" />;
    case 2:
      return <ChipOrder type="Camino" />;
    case 3:
      return <ChipOrder type="Entregado" />;
    case 4:
      return <ChipOrder type="Devuelto" />;
    case 5:
      return <ChipOrder type="Cancelado" />;
    case 6:
      return <ChipOrder type="Vencido" />;
  }
};

export default switchStatusOrder;
