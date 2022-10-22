import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import DataGridTable from "../dataGridTable.component";
import CustomButtonComponent from "../../customButton/customButton.component";
import { orderStatusEnum } from "../../../utils/constants.utils";
import {
  changeStatusOrder,
  changeStatusMultipleOrders,
} from "../../../queries/orders/orders.queries";

import { StatusContainer, OrderStatus } from "./deliveryDetailsTable.styles";
import { formatDate } from "../../../utils/general.utils";
import { useMutation, useQueryClient } from "react-query";
import { enCamino, Entregado } from "../actions/actionsEnvios";
import { CircularProgress, Modal } from "@mui/material";
import {
  useMutationOrdersEnCamino,
  useMutationOrdersEntregado,
  useMutationOrdersEnCaminoMultiple,
  useMutationOrdersEntregadoMultiple,
} from "../../hooks/orders";
import ModalEnvios from "../../modals/envios/modalEnvios";

const DeliveryDetailTableComponent = ({
  orders,
  authToken,
  setPage,
  page,
  total,
  isLoading,
  pagination,
  setPagination,
}) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [totalOf, setTotalOf] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [closeModalEntregado, setCloseModalEntregado] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (isLoading) {
      // setRows([]);
    } else {
      setRows(orders.results);
      setTotalOf(orders.total);
    }
  }, [isLoading, orders]);

  const {
    isLoading: loadingEntregado,
    isSuccess: successEntregado,
    mutate: mutateEntregado,
  } = useMutationOrdersEntregado();

  const {
    isLoading: loadingEntregadoMultiple,
    isSuccess: successEntregadoMultiple,
    mutate: mutateEntregadoMultiple,
  } = useMutationOrdersEntregadoMultiple();

  const {
    isLoading: loadingEnCamino,
    isSuccess: successEnCamino,
    mutate: mutateEnCamino,
  } = useMutationOrdersEnCamino();

  const {
    isLoading: loadingEnCaminoMultiple,
    isSuccess: successEnCaminoMultiple,
    mutate: mutateEnCaminoMultiple,
  } = useMutationOrdersEnCaminoMultiple();

  const onClickEnCaminoMultiple = async () => {
    Swal.fire({
      title: `Estás seguro de que querés cambiar los pedidos seleccionados a En camino?`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const body = [];

        for (const rowId of rowSelected)
          body.push({
            id: parseInt(rowId),
            statusId: orderStatusEnum.EN_CAMINO,
          });

        mutateEnCaminoMultiple({ authToken, body });

        Swal.fire(
          "Listo!",
          "Las órdenes han sido cambiadas a En Camino!",
          "success"
        );
      }
    });
  };

  const onClickEntregadoMultiple = async () => {
    Swal.fire({
      title: `Estás seguro de que querés cambiar los pedidos seleccionados a Entregado?`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const body = [];

        for (const rowId of rowSelected)
          body.push({
            id: parseInt(rowId),
            statusId: orderStatusEnum.ENTREGADO,
          });

        mutateEntregadoMultiple({ authToken, body });

        Swal.fire(
          "Listo!",
          "Las órdenes han sido cambiadas a En Camino!",
          "success"
        );
      }
    });
  };

  const arrayOfColumns = [
    {
      field: "id",
      headerName: "Pedido n°",
      width: 125,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "clientName",
      headerName: "Cliente",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cadetName",
      headerName: "Repartidor",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "orderDate",
      headerName: "Fecha\nde compra",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "estimatedDeliveryDate",
      headerName: "Fecha\nde entrega",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Zona",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      width: 125,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        switch (params.value) {
          case "Nuevo":
            return (
              <StatusContainer>
                <OrderStatus color="#FFEB3B">N</OrderStatus>
              </StatusContainer>
            );
          case "En camino":
            return (
              <StatusContainer>
                <OrderStatus color="#FF9800">EC</OrderStatus>
              </StatusContainer>
            );
          case "Cancelado":
            return (
              <StatusContainer>
                <OrderStatus color="#607D8B">C</OrderStatus>
              </StatusContainer>
            );
          case "Entregado":
            return (
              <StatusContainer>
                <OrderStatus color="#8BC34A">E</OrderStatus>
              </StatusContainer>
            );
          case "Devuelto":
            return (
              <StatusContainer>
                <OrderStatus color="#009688">D</OrderStatus>
              </StatusContainer>
            );
          default:
            return (
              <StatusContainer>
                <OrderStatus color="#ffffff">{params.value}</OrderStatus>
              </StatusContainer>
            );
        }
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id, status } = params.row;

        const onClickEnCamino = () => {
          Swal.fire({
            title: `Estás seguro que querés cambiar a En camino la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: "#e91e63",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
          }).then((result) => {
            if (result.isConfirmed) {
              mutateEnCamino({ id, authToken, result });
              Swal.fire(
                "Listo!",
                "La orden ha sido cambiada a En Camino!",
                "success"
              );
            }
          });
        };

        const onClickEntregado = () => {
          Swal.fire({
            title: `Estás seguro que querés cambiar a Entregada la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: "#e91e63",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
          }).then((result) => {
            if (result.isConfirmed) {
              mutateEntregado({ id, authToken, result });
              setCloseModalEntregado(true);
            }
          });
        };

        if (loadingEntregado || loadingEnCamino) {
          return (
            <Fragment>
              <CircularProgress size="1rem" />
            </Fragment>
          );
        }

        if (!isLoading && status == "Nuevo") {
          return (
            <Fragment>
              <Tooltip title="En camino" placement="top">
                <IconButton onClick={onClickEnCamino} size="large">
                  <img
                    src="/img/icons/envios_en_camino.png"
                    style={{ height: "1.6rem" }}
                  />
                </IconButton>
              </Tooltip>
            </Fragment>
          );
        }

        if (!isLoading && status == "En camino") {
          return (
            <Fragment>
              <Tooltip title="Entregado" placement="top">
                <IconButton onClick={onClickEntregado} size="large">
                  <img
                    src="/img/icons/envios_entregado.png"
                    style={{ height: "1.6rem" }}
                  />
                </IconButton>
              </Tooltip>
            </Fragment>
          );
        }
      },
    },
  ];

  const arrayOfItems = rows.map((item) => {
    return {
      id: item.id,
      cadetName: item.cadet
        ? `${item.cadet.firstName} ${item.cadet.lastName}`
        : "-",
      clientName: item.clientName,
      orderDate: formatDate(item.orderDate.substr(0, 10)),
      estimatedDeliveryDate: formatDate(
        item.estimatedDeliveryDate.substr(0, 10)
      ),
      deliveryType: item.deliveryType.description,
      location: item.clientAddress != null ? item.clientAddress.location : "",
      status: item.status.description,
    };
  });

  return (
    <Fragment>
      <Modal
        open={closeModalEntregado}
        onClose={() => setCloseModalEntregado(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-entregado-envio"
      >
        <Box sx={style}>
          <ModalEnvios setCloseModalEntregado={setCloseModalEntregado} />
        </Box>
      </Modal>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setRowSelected(newSelectionModel);
        }}
        // loading={isLoading}
        allPedidos={true}
        pagination={pagination}
        isRowSelectable={(param) => param.row.status !== "Entregado"}
        totalOfOrders={totalOf}
        onPageChange={(params) => {
          if (params > pagination) {
            setPage(page + 10);
            setPagination(params);
          } else {
            setPage(page - 10);
            setPagination(params);
          }
        }}
        sortModel={[
          {
            field: "id",
            sort: "desc",
          },
        ]}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 0px",
          zIndex: 1000,
        }}
      >
        {rowSelected.length > 0 ? (
          <Fragment>
            <CustomButtonComponent
              color="secondary"
              style={{ fontSize: "1rem", padding: "10px", height: "60px" }}
              onClick={() => {
                onClickEnCaminoMultiple();
              }}
            >
              Poner Pedidos
              <br />
              en camino ({rowSelected.length})
            </CustomButtonComponent>

            <CustomButtonComponent
              color="secondary"
              style={{
                fontSize: "1rem",
                padding: "10px",
                height: "60px",
                marginLeft: "15px",
              }}
              onClick={() => {
                onClickEntregadoMultiple();
              }}
            >
              Poner Pedidos
              <br />
              entregados ({rowSelected.length})
            </CustomButtonComponent>
          </Fragment>
        ) : (
          <Fragment />
        )}
      </div>
    </Fragment>
  );
};

export default DeliveryDetailTableComponent;
