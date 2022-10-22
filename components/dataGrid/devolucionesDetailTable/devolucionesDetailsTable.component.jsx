import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FaUndoAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import ErrorIcon from "@mui/icons-material/Error";
import { Container } from "../dataGridTable.styles";
import DataGridTable from "../dataGridTable.component";
import {
  StatusContainer,
  OrderStatus,
} from "./devolucionesDetailsTable.styles";
import { formatDate } from "../../../utils/general.utils";

const DevolucionesDetailTableComponent = ({
  //   orders,
  //   authToken,
  orders,
  authToken,
  setPage,
  page,
  total,
  isLoading,
  pagination,
  setPagination,
  isError,
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const router = useRouter();
  const [rowSelected, setRowSelected] = useState([]);

  const [rows, setRows] = useState([]);
  const [totalOf, setTotalOf] = useState();
  const [errorLoad, setErrorLoad] = useState();

  useEffect(() => {
    if (isLoading) {
      // setRows([]);
    } else if (isError) {
      setErrorLoad(true);
    } else {
      setRows(orders.results);
      setTotalOf(orders.total);
    }
  }, [isLoading, orders]);

  const editDialog = () => {
    if (openEditDialog) {
      return (
        <AssignDeliveryDialogComponent
          rowItem={rowSelected}
          isOpen={openEditDialog}
          setOpen={setOpenEditDialog}
          authToken={authToken}
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
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sellerName",
      headerName: "Vendedor",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "deliveryType",
      headerName: "Tipo de entrega",
      width: 250,
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
      field: "clientSellingTotalPrice",
      headerName: "Monto",
      width: 100,
      align: "center",
      headerAlign: "center",
    },

    // {
    //   field: "location",
    //   headerName: "Zona",
    //   width: 150,
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "status",
      headerName: "Estado",
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (
          params.value.statusId == 4 &&
          params.value.clientSellingTotalPrice > 0
        ) {
          return (
            <StatusContainer>
              <OrderStatus color="#e91e63">DP</OrderStatus>
            </StatusContainer>
          );
        } else {
          switch (params.value.statusId) {
            case 1:
              return (
                <StatusContainer>
                  <OrderStatus color="#FFEB3B">N</OrderStatus>
                </StatusContainer>
              );
            case 2:
              return (
                <StatusContainer>
                  <OrderStatus color="#FF9800">EC</OrderStatus>
                </StatusContainer>
              );
            case 5:
              return (
                <StatusContainer>
                  <OrderStatus color="#607D8B">C</OrderStatus>
                </StatusContainer>
              );
            case 3:
              return (
                <StatusContainer>
                  <OrderStatus color="#8BC34A">E</OrderStatus>
                </StatusContainer>
              );
            case 4:
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
        const { id } = params.row;

        const onClickProcesarDevolucion = () => {
          Swal.fire({
            title: `Estás seguro que querés procesar la devolución de la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: "#e91e63",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
          }).then((result) => {
            if (result.isConfirmed) {
              router
                .push(`devoluciones/${id}`)
                .then(() => window.scrollTo(0, 0));
            }
          });
        };

        return (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            {params.value.clientSellingTotalPrice <= 0 ? null : params.value
                .statusId == 4 && params.value.clientSellingTotalPrice > 0 ? (
              <Tooltip title="Devuelto parcialmente" placement="top">
                <IconButton onClick={onClickProcesarDevolucion} size="large">
                  <FaUndoAlt style={{ fontSize: "1.3rem", color: "#e91e63" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Devolver" placement="top">
                <IconButton onClick={onClickProcesarDevolucion} size="large">
                  <FaUndoAlt style={{ fontSize: "1.3rem", color: "#e91e63" }} />
                </IconButton>
              </Tooltip>
            )}
          </div>
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
      clientSellingTotalPrice: "$" + item.clientSellingTotalPrice,
      status: item,
      // statusId: item.status.id,
      actions: item,
    };
  });

  return (
    <Fragment>
      {errorLoad && (
        <Container
          size={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              textAlign: "center",
            }}
          >
            <ErrorIcon style={{ marginBottom: "10px" }} color="error" />
            <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
              Error al cargar la grilla. Por favor, verifique su conexion a
              internet o vuelva a intentarlo mas tarde.
            </span>
          </div>
        </Container>
      )}
      {!errorLoad && (
        <>
          {" "}
          <DataGridTable
            columns={arrayOfColumns}
            rows={arrayOfItems}
            onSelectionChange={(newSelection) => {
              setRowSelected(newSelection.rowIds);
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
        </>
      )}
    </Fragment>
  );
};

export default DevolucionesDetailTableComponent;
