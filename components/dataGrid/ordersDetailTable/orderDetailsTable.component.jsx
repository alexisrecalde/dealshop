import React, { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FaTrashAlt, FaTruckLoading } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";
import Swal from "sweetalert2";
import ErrorIcon from "@mui/icons-material/Error";
import CustomButtonComponent from "../../customButton/customButton.component";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

import DataGridTable from "../dataGridTable.component";
import { StatusContainer, OrderStatus } from "./orderDetailsTable.styles";
import PDFGeneratorComponent from "../../pdf/pdfGenerator.component";
import { formatDate } from "../../../utils/general.utils";
import { Container } from "../dataGridTable.styles";
import {
  useMutationOrdersEliminar,
  useMutationOrdersEntregado,
} from "../../hooks/orders";

const OrdersDetailTableComponent = ({
  orders,
  authToken,
  setPage,
  page,
  isLoading,
  pagination,
  setPagination,
  isError,
}) => {
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

  const {
    isLoading: loadingEliminado,
    isSuccess: successEliminar,
    mutate: mutateEliminar,
  } = useMutationOrdersEliminar();

  const {
    // isLoading: loadingEliminado,
    // isSuccess: successEliminar,
    mutate: mutateEntregado,
  } = useMutationOrdersEntregado();

  const arrayOfColumns = [
    {
      field: "id",
      headerName: "Pedido n°",
      width: 125,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sellerName",
      headerName: "Vendedor",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "orderDate",
      headerName: "Fecha\nde compra",
      width: 145,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "estimatedDeliveryDate",
      headerName: "Fecha\nde entrega",
      width: 145,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "deliveryType",
      headerName: "Tipo de entrega",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Zona",
      width: 125,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "address",
      headerName: "Dirección",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        switch (params.value) {
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
          case 6:
            return (
              <StatusContainer>
                <Tooltip title="Vencido" placement="top">
                  <OrderStatus color="#05dcf6">VC</OrderStatus>
                </Tooltip>
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
      width: 250,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id, orderData } = params.row;
        const { sellerId, statusId, cadetId, deliveryTypeId } = orderData;

        const onClickDelete = () => {
          const inputOptions = {
            "Falta de Stock": "Stock",
            "Cancelación por parte del vendedor": "Cancelación",
            "Otro motivo": "Otro",
          };

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
                    Swal.fire(
                      "Listo!",
                      "La orden ha sido cancelada!",
                      "success"
                    );
                  }
                });
              } else {
                mutateEliminar({ id, authToken, result });
                Swal.fire("Listo!", "La orden ha sido cancelada!", "success");
              }
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
              mutateEntregado(
                { id, authToken, result },
                {
                  onSuccess: () => {
                    Swal.fire(
                      "Listo!",
                      "La orden ha sido cambiada a Entregada!",
                      "success"
                    );
                  },
                  onError: () => {
                    Swal.fire(
                      "Error!",
                      "No se pudo cambiar la orden a Entregado",
                      "error"
                    ).then(() => handleClose());
                  },
                }
              );
            }
          });
        };

        return (
          <Fragment>
            <Tooltip title="Ver detalle" placement="top">
              <IconButton
                onClick={() => router.push(`/pedidos/${id}`)}
                size="large"
              >
                <FaEye style={{ fontSize: "1.3rem", color: "#00bcd4" }} />
              </IconButton>
            </Tooltip>
            {sellerId == null && statusId != 5 && (
              <Tooltip title="Asignar vendedor" placement="top">
                <IconButton href="/admin/asignarOrdenes" size="large">
                  <BsPersonPlusFill
                    style={{ fontSize: "1.2rem", color: "#00bcd4" }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {cadetId == null && deliveryTypeId === 1 && statusId != 5 && (
              <Tooltip title="Asignar repartidor" placement="top">
                <IconButton href="/envios/sinAsignar" size="large">
                  <FaTruckLoading
                    style={{ fontSize: "1.5rem", color: "#00bcd4" }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {statusId != 5 && statusId != 3 && statusId != 6 && (
              <Fragment>
                {deliveryTypeId === 2 && (
                  <Tooltip title={`Marcar como entregado`} placement="top">
                    <IconButton onClick={onClickEntregado} size="large">
                      <img
                        src="/img/icons/envios_entregado.png"
                        style={{ height: "1.25rem" }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
                {statusId == 4 ? null : (
                  <Tooltip title="Cancelar" placement="top">
                    <IconButton onClick={onClickDelete} size="large">
                      <FaTrashAlt
                        style={{ fontSize: "1.2rem", color: "#e91e63" }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </Fragment>
            )}
          </Fragment>
        );
      },
    },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const arrayOfItems = rows.map((order) => {
    return {
      id: order.id,
      sellerName: order.seller
        ? `${order.seller.firstName} ${order.seller.lastName}`
        : "-",
      orderDate: formatDate(order.orderDate.substr(0, 10)),
      estimatedDeliveryDate: formatDate(
        order.estimatedDeliveryDate.substr(0, 10)
      ),
      deliveryType: order.deliveryType.description,
      location:
        order.clientAddress != null ? order.clientAddress.location : "-",
      address:
        order.clientAddress != null
          ? `${order.clientAddress.street} ${order.clientAddress.streetNumber}`
          : "-",
      status: order.statusId,
      orderData: order,
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
            components={{ Toolbar: CustomToolbar }}
            sortModel={[
              {
                field: "id",
                sort: "desc",
              },
            ]}
          />
          {rowSelected.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px 0px",
                gap: "20px",
                zIndex: 10,
              }}
            >
              <PDFGeneratorComponent
                component={
                  <CustomButtonComponent
                    color="secondary"
                    style={{
                      fontSize: "1rem",
                      padding: "10px",
                      height: "60px",
                    }}
                  >
                    Imprimir flejes de los
                    <br />
                    pedidos marcados ({rowSelected.length})
                  </CustomButtonComponent>
                }
                data={{
                  name: "Flejes_Dealshop.pdf",
                  type: 2,
                  documentsData: orders.results
                    .filter((order) => rowSelected.includes(Number(order.id)))
                    .map((order) => {
                      return {
                        id: order.id,
                        sellerFirstName: order.seller
                          ? order.seller.firstName
                          : "",
                        sellerLastName: order.seller
                          ? order.seller.lastName
                          : "",
                        clientName: order.clientName,
                        deliveryType: order.deliveryType.description,
                        estimatedDeliveryDate: order.estimatedDeliveryDate,
                        clientProvince: order.clientAddress
                          ? order.clientAddress.province
                          : "",
                        clientLocation: order.clientAddress
                          ? order.clientAddress.location
                          : "",
                        clientStreet: order.clientAddress
                          ? order.clientAddress.street
                          : "",
                        clientStreetNumber: order.clientAddress
                          ? order.clientAddress.streetNumber
                          : "",
                        clientFloor: order.clientAddress
                          ? order.clientAddress.floor
                          : "",
                        clientApartment: order.clientAddress
                          ? order.clientAddress.apartment
                          : "",
                        clientSellingTotalPrice: order.clientSellingTotalPrice,
                        shippingCost:
                          order.shippingCost != null
                            ? order.shippingCost.price
                            : 0,
                        clientPhone: order.clientPhone
                          ? order.clientPhone
                          : "-",
                        additionalInfo: order.additionalInfo
                          ? order.additionalInfo
                          : "-",
                        products: order.products.map((p) => ({
                          name: p.product.name,
                          qty: p.quantity,
                        })),
                      };
                    }),
                }}
              />
              {/*
          <PDFGeneratorComponent
            component={
              <CustomButtonComponent color="secondary" style={{ fontSize: '1rem', padding: '10px', height: '60px' }}>
                Imprimir las facturas
                <br />
                de los pedidos marcados ({rowSelected.length})
              </CustomButtonComponent>
            }
            data={{
              name: `Facturas_Dealshop.pdf`,
              type: 1,
              documentsData: orders.filter((order) => rowSelected.includes(String(order.id))),
            }}
          />
          */}
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default OrdersDetailTableComponent;
