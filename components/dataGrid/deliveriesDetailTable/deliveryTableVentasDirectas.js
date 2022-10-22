import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Dialog } from "primereact/dialog";
import {
  FaTrashAlt,
  FaTruckLoading,
  FaCheck,
  FaWindowClose,
  FaBoxOpen,
} from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

import CustomButtonComponent from "../../customButton/customButton.component";
import DataGridTable from "../dataGridTable.component";

import PDFGeneratorComponent from "../../pdf/pdfGenerator.component";
import { changeStatusPurchaseOrder } from "../../../queries/orders/orders.queries";
import { purchaseStatusEnum } from "../../../utils/constants.utils";
import { formatDate } from "../../../utils/general.utils";
import AssignDeliveryDialogComponent from "../deliveriesToAssignDetailTable/assignDeliveryDialog.component";
import {
  useMutationAsignarRepartidorVenta,
  useMutationEnPreparacionVentaDirecta,
  useMutationEntregadoVentaDirecta,
  useMutationAsignarFecha,
} from "../../hooks/orders";
import ModalAsignarFecha from "../clientesTable/modalAsignarFecha";

const DeliveryTableVentasDirecta = ({
  orders,
  authToken,
  isLoading,
  isError,
  enviosSinAsignar,
}) => {
  const router = useRouter();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);
  const [openAsignarFecha, setOpenAsignarFecha] = useState(false);
  const [idFecha, setIdFecha] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (isLoading) {
      // setRows([]);
    } else if (isError) {
      setErrorLoad(true);
    } else {
      setRows(orders);
      // setTotalOf(orders.total);
    }
  }, [isLoading, orders]);


  const { mutate: mutateEnPreparacionVentaDirecta } =
    useMutationEnPreparacionVentaDirecta();

  const { mutate: mutateAsignarRepartidorVenta } =
    useMutationAsignarRepartidorVenta();

  const { mutate: mutateEntregadoVentaDirecta } =
    useMutationEntregadoVentaDirecta();

  const { isSuccess: successFecha, mutate: mutateAsignarFecha } =
    useMutationAsignarFecha();


  const ChipOrdeer = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  // const multiplePurchase = async (authToken, body) => {
  //   const res = await changeStatusMultiplePurchaseOrderDelivery({
  //     authToken,
  //     body,
  //   });

  //   console.log(res);
  // };

  const arrayOfColumns = [
    {
      field: "id",
      headerName: "Pedido n°",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { orderData } = params.row;
        const { id } = orderData;

        return (
          <Fragment>
            <Tooltip
              title={
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "4px 0",
                    }}
                  >
                    <span>Id: </span>
                    <span style={{ marginLeft: "5px" }}>{id}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "4px 0",
                    }}
                  >
                    <span>Cliente: </span>
                    <span style={{ marginLeft: "5px" }}>
                      {orderData.Client.firstName} {orderData.Client.lastName}
                    </span>{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "4px 0",
                    }}
                  >
                    <span>Email:</span>
                    <span style={{ marginLeft: "5px" }}>
                      {orderData.Client.email}
                    </span>{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "4px 0",
                    }}
                  >
                    <span>Cantidad de productos:</span>
                    <span style={{ marginLeft: "5px" }}>
                      {orderData.quantity}
                    </span>{" "}
                  </div>
                  <span>Productos:</span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "0px 0",
                    }}
                  >
                    <ul style={{ marginLeft: "12px", paddingLeft: "0px" }}>
                      {orderData.ClientSaleDetail.map((el) => {
                        return (
                          <li
                            style={{
                              marginLeft: "0px",
                              fontSize: "12px",
                              listStyle: "circle",
                            }}
                          >
                            {/* <span style={{ marginLeft: "5px" }}> */}
                            {el.productName}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              }
              placement="left"
            >
              <span>{id}</span>
            </Tooltip>
          </Fragment>
        );
      },
    },
    // {
    //   field: "clientName",
    //   headerName: "Cliente",
    //   width: 120,
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "orderDate",
      headerName: "Fecha\nde compra",
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
      field: "estimatedDeliveryDate",
      headerName: "Fecha de entrega",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { orderData } = params.row;
        const { deliveryTypeId, estimatedDeliveryDate, createdAt } = orderData;

        return (
          <Fragment>
            {deliveryTypeId !== 2 ? (
              estimatedDeliveryDate ? (
                <>
                  {/* <Tooltip title="Asignar fecha" placement="left"> */}
                  <div>{formatDate(estimatedDeliveryDate.substr(0, 10))}</div>
                  {/* </Tooltip> */}
                </>
              ) : (
                <>
                  <Tooltip title="Asinar fecha" placement="left">
                    <div
                      onClick={() => {
                        setIdFecha([orderData.id]);
                        setOpenAsignarFecha(true);
                      }}
                    >
                      Sin fecha asignada
                    </div>
                  </Tooltip>
                </>
              )
            ) : (
              "N/A"
            )}
          </Fragment>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "shippingType",
      headerName: "Tipo de envio",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "seguimiento",
      headerName: "N Seguimiento",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { orderData } = params.row;
        const { deliveryTypeId } = orderData;

        return (
          <Fragment>
            {deliveryTypeId !== 2 ? (
              <Tooltip title="Click para copiar" placement="left">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(`${params.value}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {params.value}
                </div>
              </Tooltip>
            ) : (
              "N/A"
            )}
          </Fragment>
        );
      },
    },
    {
      field: "orderStatus",
      headerName: "Estado orden",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        switch (params.value) {
          case 1:
            return <ChipOrdeer type="Aprobado" />;
          case 2:
            return <ChipOrdeer type="Pendiente" />;
          case 3:
            return <ChipOrdeer type="Error" />;
          case 4:
            return <ChipOrdeer type="Pendiente" />;
          case 6:
            return <ChipOrdeer type="Preparacion" />;
          case 7:
            return <ChipOrdeer type="Camino" />;
          case 8:
            return <ChipOrdeer type="Entregado" />;
        }
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { orderData, cadetId } = params.row;
        const { id, deliveryTypeId } = orderData;

        const onClickEdit = () => {
          setRowSelected({ id });
          setOpenEditDialog(true);
          return;
        };

        const onClickVerOrden = () => {
          router.push(`/admin/clientes/comprasId//${id}`);
        };

        const onClickEditCamino = () => {
          setRowSelected({ id });
          setOpenEditDialog(true);
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
              mutateEntregadoVentaDirecta({ id, authToken });
              Swal.fire(
                "Listo!",
                "La orden ha sido cambiada a Entregada!",
                "success"
              );
            }
          });
        };

        const onClickEnPreparacion = () => {
          Swal.fire({
            title: `Estás seguro que querés cambiar a en Preparacion la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: "#e91e63",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
          }).then((result) => {
            if (result.isConfirmed) {
              mutateEnPreparacionVentaDirecta({ id, authToken });
              Swal.fire(
                "Listo!",
                "La orden ha sido cambiada a En Preparacion!",
                "success"
              );
            }
          });
        };

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
          });
          // .then((result) => {
          //   if (result.isConfirmed) {
          //     if (result.value == "Otro motivo") {
          //       Swal.fire({
          //         title: "Ingrese el motivo de cancelación",
          //         input: "textarea",
          //         inputPlaceholder: "Detalle",
          //         inputAttributes: {
          //           "aria-label": "Detalle",
          //         },
          //         showCancelButton: true,
          //         reverseButtons: true,
          //         confirmButtonColor: "#e91e63",
          //         cancelButtonText: "Cancelar",
          //         confirmButtonText: "Confirmar",
          //       })
          // .then((result) => {
          //     if (result.isConfirmed) {
          //       deleteOrder({ id, authToken, message: result.value });
          //       Swal.fire(
          //         "Listo!",
          //         "La orden ha sido cancelada!",
          //         "success"
          //       ).then(() => {
          //         router.reload().then(() => window.scrollTo(0, 0));
          //       });
          //     }
          //   });
          // } else {
          //   deleteOrder({ id, authToken, message: result.value });
          //   Swal.fire(
          //     "Listo!",
          //     "La orden ha sido cancelada!",
          //     "success"
          //   ).then(() => {
          //     router.reload().then(() => window.scrollTo(0, 0));
          //   });
          // }
          // }
          // });
        };

        const onClickEnCamino = () => {
          if (cadetId) {
            const status = {
              clientStatusOrderId: purchaseStatusEnum.EN_CAMINO,
            };
            Swal.fire({
              title: `Estás seguro que querés cambiar a Entregada la orden n° ${id}?`,
              showCancelButton: true,
              reverseButtons: true,
              confirmButtonColor: "#e91e63",
              cancelButtonText: "Cancelar",
              confirmButtonText: "Confirmar",
            }).then((result) => {
              if (result.isConfirmed) {
                changeStatusPurchaseOrder({
                  id,
                  authToken,
                  status: status,
                });
                Swal.fire(
                  "Listo!",
                  "La orden ha sido cambiada a En camino!",
                  "success"
                ).then(() => {
                  router.reload();
                });
              }
            });
          } else {
            onClickEditCamino();
          }
        };

        return (
          <Fragment>
            {/* {deliveryTypeId == 2 ? (
              <>
                {orderData.clientStatusOrderId == 8 ? null : (
                  <Tooltip title={`Marcar en entregado`} placement="top">
                    <IconButton onClick={onClickEntregado}>
                      <img
                        src="/img/icons/envios_entregado.png"
                        style={{ height: "1.25rem" }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            ) : null} */}

            {deliveryTypeId == 1 ? (
              <>
                {" "}
                {orderData.clientStatusPaymentId == 2 ||
                orderData.clientStatusPaymentId == 4 ? (
                  ""
                ) : orderData.clientStatusOrderId == 6 &&
                  orderData.cadetId == null ? (
                  <Tooltip title="Asignar" placement="top">
                    <IconButton onClick={onClickEdit}>
                      <FaTruckLoading
                        style={{ fontSize: "1.3rem", color: "#00bcd4" }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {orderData.clientStatusPaymentId == 2 ||
                orderData.clientStatusPaymentId == 4 ? (
                  ""
                ) : orderData.clientStatusOrderId == 4 ||
                  orderData.clientStatusOrderId == 1 ? (
                  <Tooltip title={`Marcar en preparacion`} placement="top">
                    <IconButton onClick={onClickEnPreparacion}>
                      <FaBoxOpen style={{ fontSize: "1rem", color: "green" }} />
                    </IconButton>
                  </Tooltip>
                ) : orderData.clientStatusOrderId == 6 ? (
                  <Tooltip title={`Marcar en camino`} placement="top">
                    <IconButton onClick={onClickEnCamino}>
                      <img
                        src="/img/icons/envios_entregado.png"
                        style={{ height: "1.25rem" }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : orderData.clientStatusOrderId == 7 ? (
                  <Tooltip title={`Marcar en entregado`} placement="top">
                    <IconButton onClick={onClickEntregado}>
                      <img
                        src="/img/icons/envios_entregado.png"
                        style={{ height: "1.25rem" }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : orderData.clientStatusOrderId == 8 ? (
                  ""
                ) : (
                  ""
                )}
              </>
            ) : null}
            <Fragment>
              <Tooltip title={`Ver orden`} placement="top">
                <IconButton onClick={onClickVerOrden}>
                  <FaEye style={{ fontSize: "1rem", color: "red" }} />
                </IconButton>
              </Tooltip>
            </Fragment>
            {orderData.clientStatusOrderId == 1 ||
              (orderData.clientStatusOrderId == 6 && (
                <Fragment>
                  <Tooltip title="Cancelar" placement="top">
                    <IconButton size="large" onClick={onClickDelete}>
                      <FaTrashAlt
                        style={{ fontSize: "1.2rem", color: "#e91e63" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Fragment>
              ))}
          </Fragment>
        );
      },
    },
  ];

  const arrayOfItems = rows.map((venta) => {
    return {
      id: venta.id,
      clientName: venta.clientId == null ? "No logeado" : venta.clientId,
      orderDate: formatDate(venta.createdAt.substr(0, 10)),
      deliveryType:
        venta.deliveryTypeId === 1 ? "Envio domicilio" : "Retiro por sucursal",
      estimatedDeliveryDate: venta.estimatedDeliveryDate,
      total: venta.total,
      seguimiento: venta.paymentCode,
      statusPayment: venta.clientStatusPaymentId,
      orderStatus: venta.clientStatusOrderId,
      shippingType: venta.shippingType,
      orderData: venta,
      acciones: { venta: venta },
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
        initialState={{
          sorting: {
            sortModel: [{ field: "orderDate", sort: "desc" }],
          },
        }}
        ventas={true}
        isRowSelectable={(params) =>
          params.row.orderData.clientStatusOrderId !== 8
        }
      />
    </Fragment>
  );
};

export default DeliveryTableVentasDirecta;
