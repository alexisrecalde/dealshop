import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FaTrashAlt, FaTruckLoading } from "react-icons/fa";
import Swal from "sweetalert2";

import DataGridTable from "../dataGridTable.component";
import AssignDeliveryDialogComponent from "./assignDeliveryDialog.component";
import CustomButtonComponent from "../../customButton/customButton.component";

import { deleteOrder } from "../../../queries/orders/orders.queries";
import { getAllCadets } from "../../../queries/users/users.queries.js";
import { formatDate } from "../../../utils/general.utils";
import {
  useMutationAsignarRepartidor,
  useMutationOrdersEliminar,
  useMutationAsignarRepartidorMultiple,
} from "../../hooks/orders";

const DeliveryToAssignDetailTableComponent = ({
  orders,
  authToken,
  setPage,
  page,
  total,
  isLoading,
  pagination,
  setPagination,
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const router = useRouter();
  const [rowSelected, setRowSelected] = useState([]);
  const [getCadets, setCadets] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalOf, setTotalOf] = useState([]);

  useEffect(() => {
    if (isLoading) {
      // setRows([]);
    } else {
      setRows(orders.results);
      setTotalOf(orders.total);
    }
  }, [isLoading, orders]);

  useEffect(() => {
    const retrieveAllCadets = async () => {
      const retrievedCadets = await getAllCadets(authToken);

      setCadets(retrievedCadets);
    };

    retrieveAllCadets();
  }, []);

  const {
    isLoading: loadingEliminado,
    isSuccess: successEliminar,
    mutate: mutateEliminar,
  } = useMutationOrdersEliminar();

  const {
    isLoading: loadingAsignarRepartidor,
    isSuccess: successAsignarRepartidor,
    mutate: mutateAsignarRepartidor,
  } = useMutationAsignarRepartidor();

  const {
    isLoading: loadingAsignarRepartidorMultiple,
    isSuccess: successAsignarRepartidorMultiple,
    mutate: mutateAsignarRepartidorMultiple,
  } = useMutationAsignarRepartidorMultiple();

  const editDialog = () => {
    if (openEditDialog) {
      return (
        <AssignDeliveryDialogComponent
          rowItem={rowSelected}
          isOpen={openEditDialog}
          setOpen={setOpenEditDialog}
          authToken={authToken}
          cadets={getCadets}
          mutateAsignarRepartidor={mutateAsignarRepartidor}
          mutateAsignarRepartidorMultiple={mutateAsignarRepartidorMultiple}
        />
      );
    }
    return;
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
      field: "sellerName",
      headerName: "Vendedor",
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
      field: "actions",
      headerName: "Acciones",
      width: 120,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id, status } = params.row;

        const onClickEdit = () => {
          setRowSelected({ id });
          setOpenEditDialog(true);
          return;
        };

        const onClickDelete = () => {
          const inputOptions = {
            "Falta de Stock": "Stock",
            "Cancelación por parte del vendedor": "Cancelación",
            "Otro motivo": "Otro",
          };

          if (status === "Cancelado" || status === "Entregado") {
            Swal.fire({
              title: `Está acción no se puede realizar.`,
              text: "La orden se encuentra en estado de entregada y no se puede cancelar. O la orden ya se encuentra en estado de cancelada.",
              icon: "error",
              reverseButtons: true,
              confirmButtonColor: "#e91e63",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: `Estás seguro que querés cancelar la orden n° ${id}?`,
              html: "<h3>Motivo:</h3>",
              icon: "warning",
              showCancelButton: true,
              reverseButtons: true,
              confirmButtonColor: "#e91e63",
              input: "radio",
              inputOptions: inputOptions,
              cancelButtonText: "Cancelar",
              confirmButtonText: "Confirmar",
            }).then((result) => {
              if (result.isConfirmed) {
                if (result.value == "Otro motivo") {
                  Swal.fire({
                    title: "Ingrese el motivo de cancelación",
                    input: "textarea",
                    inputPlaceholder: "Detalle",
                    inputAttributes: {
                      "aria-label": "Detalle",
                    },
                    showCancelButton: true,
                    reverseButtons: true,
                    confirmButtonColor: "#e91e63",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Confirmar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      mutateEliminar({ id, authToken, result });
                      // deleteOrder({ id, authToken, message: result.value });
                      Swal.fire(
                        "Listo!",
                        "La orden ha sido cancelada!",
                        "success"
                      );
                    }
                  });
                } else {
                  mutateEliminar({ id, authToken, result });
                  // deleteOrder({ id, authToken, message: result.value });
                  Swal.fire("Listo!", "La orden ha sido cancelada!", "success");
                }
              }
            });
          }
        };

        return (
          <Fragment>
            <Tooltip title="Asignar" placement="top">
              <IconButton onClick={onClickEdit} size="large">
                <FaTruckLoading
                  style={{ fontSize: "1.3rem", color: "#00bcd4" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar" placement="top">
              <IconButton onClick={onClickDelete} size="large">
                <FaTrashAlt style={{ fontSize: "1.2rem", color: "#e91e63" }} />
              </IconButton>
            </Tooltip>
          </Fragment>
        );
      },
    },
  ];

  const arrayOfItems = rows.map((item) => {
    return {
      id: item.id,
      sellerName: item.seller
        ? `${item.seller.firstName} ${item.seller.lastName}`
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
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setRowSelected(newSelectionModel);
        }}
        loading={isLoading}
        allPedidos={true}
        pagination={pagination}
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
      {editDialog()}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 0px",
          zIndex: 1000
        }}
      >
        {rowSelected.length > 0 && (
          <CustomButtonComponent
            color="secondary"
            style={{ fontSize: "1rem", padding: "10px", height: "60px" }}
            onClick={() => {
              setOpenEditDialog(true);
            }}
          >
            Asignar pedidos
            <br />
            marcados ({rowSelected.length})
          </CustomButtonComponent>
        )}
      </div>
    </Fragment>
  );
};

export default DeliveryToAssignDetailTableComponent;
