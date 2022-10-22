import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { IoDocumentText } from "react-icons/io5";
import { AiFillPrinter } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Container } from "../dataGridTable.styles";
import { useRouter } from "next/router";
import ErrorIcon from "@mui/icons-material/Error";
import DataGridTable from "../dataGridTable.component";
import { StatusContainer, OrderStatus } from "./orderDetailsTable.styles";
import PDFGeneratorComponent from "../../pdf/pdfGenerator.component";
import { formatDate } from "../../../utils/general.utils";

const SellerOrdersDetailTableComponent = ({
  orders,
  showStrip,
  showInvoice,
  isSellerLeader,
  setPage,
  page,
  // total,
  isLoading,
  pagination,
  setPagination,
  isError,
}) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [errorLoad, setErrorLoad] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isLoading) {
      // setRows([]);
    } else if (isError) {
      setErrorLoad(true);
    } else {
      setRows(orders.results);
      setTotal(orders.total);
    }
  }, [isLoading, orders]);

  const arrayOfColumns = [
    {
      field: "id",
      headerName: "Pedido n°",
      width: 100,
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
      field: "orderDate",
      headerName: "Fecha de compra",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "estimatedDeliveryDate",
      headerName: "Fecha de entrega",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "deliveryType",
      headerName: "Tipo de entrega",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cadet",
      headerName: "Cadete",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Zona",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      width: 90,
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
      width: 175,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id, orderData } = params.row;

        return (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <IconButton
              onClick={() => router.push(`/pedidos/${id}`)}
              size="large"
            >
              <FaEye style={{ fontSize: "1.3rem", color: "#e91e63" }} />
            </IconButton>
            {showInvoice != false && (
              <PDFGeneratorComponent
                component={
                  <IconButton size="large">
                    <IoDocumentText
                      style={{ fontSize: "1.3rem", color: "#e91e63" }}
                    />
                  </IconButton>
                }
                data={{
                  name: `Factura_Dealshop_n${id}`,
                  type: 1,
                  documentsData: [orderData],
                }}
              />
            )}
            {showStrip != false && (
              <PDFGeneratorComponent
                component={
                  <IconButton size="large">
                    <AiFillPrinter
                      style={{ fontSize: "1.4rem", color: "#e91e63" }}
                    />
                  </IconButton>
                }
                data={{
                  name: `Fleje_Dealshop_n${id}`,
                  type: 2,
                  documentsData: [
                    {
                      id: orderData.id,
                      sellerFirstName: orderData.seller
                        ? orderData.seller.firstName
                        : "",
                      sellerLastName: orderData.seller
                        ? orderData.seller.lastName
                        : "",
                      clientName: orderData.clientName,
                      deliveryType: orderData.deliveryType.description,
                      estimatedDeliveryDate: formatDate(
                        orderData.estimatedDeliveryDate
                      ),
                      clientProvince: orderData.clientAddress
                        ? orderData.clientAddress.province
                        : "",
                      clientLocation: orderData.clientAddress
                        ? orderData.clientAddress.location
                        : "",
                      clientStreet: orderData.clientAddress
                        ? orderData.clientAddress.street
                        : "",
                      clientStreetNumber: orderData.clientAddress
                        ? orderData.clientAddress.streetNumber
                        : "",
                      clientFloor: orderData.clientAddress
                        ? orderData.clientAddress.floor
                        : "",
                      clientApartment: orderData.clientAddress
                        ? orderData.clientAddress.apartment
                        : "",
                      clientSellingTotalPrice:
                        orderData.clientSellingTotalPrice,
                      shippingCost:
                        orderData.shippingCost != null
                          ? orderData.shippingCost.price
                          : "-",
                    },
                  ],
                }}
              />
            )}
          </div>
        );
      },
    },
  ];

  if (isSellerLeader) {
    arrayOfColumns.splice(1, 0, {
      field: "sellerName",
      headerName: "Vendedor",
      width: 300,
      align: "center",
      headerAlign: "center",
    });
  }

  const arrayOfItems = rows.map((order) => {
    return {
      id: order.id,
      sellerName: `${order.seller.firstName} ${order.seller.lastName}`,
      clientName: order.clientName ? order.clientName : "-",
      orderDate: formatDate(order.orderDate.substr(0, 10)),
      estimatedDeliveryDate: formatDate(
        order.estimatedDeliveryDate.substr(0, 10)
      ),
      deliveryType: order.deliveryType.description,
      cadet: order.cadet ? order.cadet.firstName : "-",
      location:
        order.clientAddress != null ? order.clientAddress.location : "-",
      status: order.statusId,
      orderData: order,
    };
  });

  return (
    <>
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
        <DataGridTable
          columns={arrayOfColumns}
          rows={arrayOfItems}
          // onSelectionChange={(newSelection) => {
          //   setRowSelected(newSelection.rowIds);
          // }}

          onSelectionModelChange={(newSelectionModel) => {
            setRowSelected(newSelectionModel);
          }}
          loading={isLoading}
          allPedidos={true}
          pagination={pagination}
          totalOfOrders={total}
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
      )}
    </>
  );
};

export default SellerOrdersDetailTableComponent;
