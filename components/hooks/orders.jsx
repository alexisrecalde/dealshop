import { useMutation, useQueryClient } from "react-query";
import {
  AsignarRepartidorOrdenSinAsignar,
  EliminarOrdenSinAsignar,
  enCamino,
  Entregado,
  AsignarVendedor,
  ActualizarProducto,
  AsignarRepartidorOrdenSinAsignarMultiple,
  enCaminoMultiple,
  EntregadoMultiple,
  AsignarRepartidorOrdenSinAsignarVenta,
  EnPreparacionVentaDirecta,
  EntregadoVentaDirecta,
  AsignarEstimadaEntregaFechaVenta
} from "../dataGrid/actions/actionsEnvios";

export const useMutationOrdersEntregado = () => {
  const queryClient = useQueryClient();

  return useMutation(Entregado, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersEnvios");
      queryClient.invalidateQueries("ordersAll");
      queryClient.invalidateQueries("ordersSeguimiento");
    },
  });
};

export const useMutationOrdersEntregadoMultiple = () => {
  const queryClient = useQueryClient();

  return useMutation(EntregadoMultiple, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersEnvios");
      queryClient.invalidateQueries("ordersAll");
      queryClient.invalidateQueries("ordersSeguimiento");
    },
  });
};

//["ordersSeguimiento", offset, query],

export const useMutationOrdersEnCamino = () => {
  const queryClient = useQueryClient();

  return useMutation(enCamino, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersEnvios");
      queryClient.invalidateQueries("ordersSeguimiento");
    },
  });
};

export const useMutationOrdersEnCaminoMultiple = () => {
  const queryClient = useQueryClient();

  return useMutation(enCaminoMultiple, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersEnvios");
      queryClient.invalidateQueries("ordersSeguimiento");

    },
  });
};

export const useMutationAsignarRepartidor = () => {
  const queryClient = useQueryClient();

  return useMutation(AsignarRepartidorOrdenSinAsignar, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersSinAsignar");
      queryClient.invalidateQueries("ordersSeguimiento");
      // queryClient.invalidateQueries("ordersAll");
    },
  });
};


export const useMutationAsignarRepartidorMultiple = () => {
  const queryClient = useQueryClient();

  return useMutation(AsignarRepartidorOrdenSinAsignarMultiple, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersSinAsignar");
      queryClient.invalidateQueries("ordersSeguimiento");
      // queryClient.invalidateQueries("ordersAll");
    },
  });
};

export const useMutationOrdersEliminar = () => {
  const queryClient = useQueryClient();
  return useMutation(EliminarOrdenSinAsignar, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersSinAsignar");
      queryClient.invalidateQueries("ordersAll");
    },
  });
};

export const useMutationOrdersAsignarOrdenVendedor = () => {
  const queryClient = useQueryClient();

  return useMutation(AsignarVendedor, {
    onSuccess: () => {
      queryClient.invalidateQueries("ordersAllToAssing");
      queryClient.invalidateQueries("ordersAll");
    },
  });
};

export const useMutationActualizarProductos = () => {
  const queryClient = useQueryClient();

  return useMutation(ActualizarProducto, {
    onSuccess: () => {
      queryClient.invalidateQueries("product");
      // queryClient.invalidateQueries("ordersAll");
    },
    onError: () => {
      queryClient.invalidateQueries("product");
    },
  });
};


//MUTATION PARA ACCIONES DE PEDIDOS DE CLIENTES DIRECTOS

export const useMutationAsignarRepartidorVenta = () => {
  const queryClient = useQueryClient();

  return useMutation(AsignarRepartidorOrdenSinAsignarVenta, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventas");
      queryClient.invalidateQueries("ventas-sin-cadete");
      // queryClient.invalidateQueries("ordersSeguimiento");
      // queryClient.invalidateQueries("ordersAll");
    },
  });
};

export const useMutationEnPreparacionVentaDirecta = () => {
  const queryClient = useQueryClient();

  return useMutation(EnPreparacionVentaDirecta, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventas");
      queryClient.invalidateQueries("ventas-sin-cadete");
    },
  });
};

export const useMutationEntregadoVentaDirecta = () => {
  const queryClient = useQueryClient();

  return useMutation(EntregadoVentaDirecta, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventas");
      queryClient.invalidateQueries("ventas-sin-cadete");
   
    },
  });
};

export const useMutationAsignarFecha = () => {
  const queryClient = useQueryClient();

  return useMutation(AsignarEstimadaEntregaFechaVenta, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventas");
      queryClient.invalidateQueries("ventas-sin-cadete");
    },
  });
};
