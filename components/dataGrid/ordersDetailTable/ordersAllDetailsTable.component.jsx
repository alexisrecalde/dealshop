import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useQuery } from "react-query";
import { IoDocumentText } from "react-icons/io5";
import { AiFillPrinter } from "react-icons/ai";
import { FaTrashAlt, FaTruckLoading } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";
import Swal from "sweetalert2";

import CustomButtonComponent from "../../customButton/customButton.component";

import { deleteOrder, getOrders } from "../../../queries/orders/orders.queries";

import DataGridTable from "../dataGridTable.component";
import { StatusContainer, OrderStatus } from "./orderDetailsTable.styles";
import PDFGeneratorComponent from "../../pdf/pdfGenerator.component";

import { changeStatusOrder } from "../../../queries/orders/orders.queries";
import {
  orderStatusEnum,
  deliveryTypeEnum,
} from "../../../utils/constants.utils";
import { formatDate } from "../../../utils/general.utils";
import axios from "axios";
import getConfig from "next/config";

const OrdersAllDetailTableComponent = ({
  clicked,
  authToken,
  setOffset,
  offset,
  pagination,
  setPagination,
}) => {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const { publicRuntimeConfig } = getConfig();
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(10);
  // const [pageFil, setPageFil] =useState(0)
  // const [pagination, setPagination] = useState(0);
  // const [offset, setOffset] = useState(0);
  const [totalOfOrders, setTotalOfOrders] = useState();

  const apiUrl = `${publicRuntimeConfig.backend_url}/orders`;

  const {
    deliveryTypeId,
    statusId,
    sellerId,
    id,
    orderDateFrom,
    orderDateTo,
    location,
  } = router.query;

  const { query } = router;

  const getOrdersPage = async () => {
    setLoading(true);
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: { _limite: page, _page: offset },
    };
    try {
      const { data } = await axios.get(apiUrl, config);
      setLoading(false);
      setTotalOfOrders(data.total);
      setRows(data.results);
    } catch (error) {
      return;
    }
  };

  const getOrderFilter = async () => {
    // setTotalOfOrders(0);
    setLoading(true);
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        _limite: page,
        _page: offset,
        deliveryTypeId,
        statusId,
        sellerId,
        id,
        orderDateFrom,
        orderDateTo,
        location,
      },
    };
    try {
      const { data } = await axios.get(apiUrl, config);
      setLoading(false);
      setRows(data.results);
      setTotalOfOrders(data.total);
    } catch (error) {
      throw error;
    }
  };

  const getOrdersOnClick = async () => {
    // setRows([]);
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: { _limite: page, _page: offset },
    };
    try {
      const { data } = await axios.get(apiUrl, config);
      setTotalOfOrders(data.total);
      setRows(data.results);
    } catch (error) {
      throw error 
    }
  };

  useEffect(() => {
    const getAll = async () => {
      getOrdersPage();
    };
    getAll();
  }, []);

  useEffect(() => {
    const getOrderPageOnClick = () => {
      if (
        deliveryTypeId ||
        statusId ||
        sellerId ||
        id ||
        orderDateFrom ||
        orderDateTo ||
        location
      ) {
        getOrderFilter();
      } else {
        getOrdersOnClick();
      }
    };

    getOrderPageOnClick();
  }, [pagination]);

  useEffect(() => {
    const getInFiltering = async () => {
      if (
        deliveryTypeId ||
        statusId ||
        sellerId ||
        id ||
        orderDateFrom ||
        orderDateTo ||
        location
      ) {
        setPagination(0);
        getOrderFilter();
      } else {
        return;
      }
    };

    getInFiltering();
  }, [query]);

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
                    deleteOrder({ id, authToken, message: result.value });
                    Swal.fire(
                      "Listo!",
                      "La orden ha sido cancelada!",
                      "success"
                    ).then(() => {
                      router.reload().then(() => window.scrollTo(0, 0));
                    });
                  }
                });
              } else {
                deleteOrder({ id, authToken, message: result.value });
                Swal.fire(
                  "Listo!",
                  "La orden ha sido cancelada!",
                  "success"
                ).then(() => {
                  router.reload().then(() => window.scrollTo(0, 0));
                });
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
              changeStatusOrder({
                id,
                authToken,
                statusId: orderStatusEnum.ENTREGADO,
                message: result.value,
              });
              Swal.fire(
                "Listo!",
                "La orden ha sido cambiada a Entregada!",
                "success"
              ).then(() => {
                router.reload();
              });
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
            {/*
            <PDFGeneratorComponent
              component={
                <Tooltip title="Factura" placement="top">
                  <IconButton>
                    <IoDocumentText style={{ fontSize: '1.3rem', color: '#00bcd4' }} />
                  </IconButton>
                </Tooltip>
              }
              data={{ name: `Factura_Dealshop_n${id}`, type: 1, documentsData: [orderData] }}
            />
            <PDFGeneratorComponent
              component={
                <Tooltip title="Fleje" placement="top">
                  <IconButton>
                    <AiFillPrinter style={{ fontSize: '1.4rem', color: '#00bcd4' }} />
                  </IconButton>
                </Tooltip>
              }
              data={{
                name: `Fleje_Dealshop_n${id}`,
                type: 2,
                documentsData: [
                  {
                    id: orderData.id,
                    sellerFirstName: orderData.seller ? orderData.seller.firstName : '',
                    sellerLastName: orderData.seller ? orderData.seller.lastName : '',
                    clientName: orderData.clientName,
                    deliveryType: orderData.deliveryType.description,
                    estimatedDeliveryDate: orderData.estimatedDeliveryDate,
                    clientProvince: orderData.clientAddress ? orderData.clientAddress.province : '',
                    clientLocation: orderData.clientAddress ? orderData.clientAddress.location : '',
                    clientStreet: orderData.clientAddress ? orderData.clientAddress.street : '',
                    clientStreetNumber: orderData.clientAddress ? orderData.clientAddress.streetNumber : '',
                    clientFloor: orderData.clientAddress ? orderData.clientAddress.floor : '',
                    clientApartment: orderData.clientAddress ? orderData.clientAddress.apartment : '',
                    clientSellingTotalPrice: orderData.clientSellingTotalPrice,
                    shippingCost: orderData.shippingCost.price,
                  },
                ],
              }}
            />
          */}
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
            {statusId != 5 && statusId != 3 && (
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
                <Tooltip title="Cancelar" placement="top">
                  <IconButton onClick={onClickDelete} size="large">
                    <FaTrashAlt
                      style={{ fontSize: "1.2rem", color: "#e91e63" }}
                    />
                  </IconButton>
                </Tooltip>
              </Fragment>
            )}
          </Fragment>
        );
      },
    },
  ];

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
      <DataGridTable
        allPedidos={true}
        columns={arrayOfColumns}
        rows={arrayOfItems}
        checkboxSelection
        loading={loading}
        onSelectionModelChange={(newSelectionModel) => {
          setRowSelected(newSelectionModel);
        }}
        pagination={pagination}
        totalOfOrders={totalOfOrders}
        onPageChange={(params) => {
          if (params > pagination) {
            setOffset(offset + 10);
            setPagination(params);
          } else {
            setOffset(offset - 10);
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
      {rowSelected.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px 0px",
            gap: "20px",
            zIndex: "5",
          }}
        >
          <PDFGeneratorComponent
            component={
              <CustomButtonComponent
                color="secondary"
                style={{ fontSize: "1rem", padding: "10px", height: "60px" }}
              >
                Imprimir flejes de los
                <br />
                pedidos marcados ({rowSelected.length})
              </CustomButtonComponent>
            }
            data={{
              name: "Flejes_Dealshop.pdf",
              type: 2,
              documentsData: rows
                .filter((order) => rowSelected.includes(Number(order.id)))
                .map((order) => {
                  return {
                    id: order.id,
                    sellerFirstName: order.seller ? order.seller.firstName : "",
                    sellerLastName: order.seller ? order.seller.lastName : "",
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
                      order.shippingCost != null ? order.shippingCost.price : 0,
                    clientPhone: order.clientPhone ? order.clientPhone : "-",
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
        </div>
      )}
    </Fragment>
  );
};

export default OrdersAllDetailTableComponent;
