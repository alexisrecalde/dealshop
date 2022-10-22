import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import {
  FaTrashAlt,
  FaTruckLoading,
  FaCheck,
  FaWindowClose,
  FaBoxOpen,
} from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { BsPersonPlusFill } from "react-icons/bs";
import Swal from "sweetalert2";

import CustomButtonComponent from "../../customButton/customButton.component";

import { deleteOrder } from "../../../queries/orders/orders.queries";

import DataGridTable from "../dataGridTable.component";
import {
  StatusContainer,
  OrderStatus,
  PurchaseStatus,
} from "../ordersDetailTable/orderDetailsTable.styles";
import PDFGeneratorComponent from "../../pdf/pdfGenerator.component";
import {
  useMutationAsignarRepartidorVenta,
  useMutationEnPreparacionVentaDirecta,
  useMutationEntregadoVentaDirecta,
  useMutationAsignarFecha,
} from "../../hooks/orders";

import {
  changeStatusOrder,
  changeStatusPurchaseOrder,
} from "../../../queries/orders/orders.queries";
import {
  orderStatusEnum,
  purchaseStatusEnum,
  deliveryTypeEnum,
} from "../../../utils/constants.utils";
import AssignDeliveryDialogComponent from "../deliveriesToAssignDetailTable/assignDeliveryDialog.component";
import { formatDate } from "../../../utils/general.utils";

const ComprasTable = ({ arrayCompras, authToken }) => {
  const router = useRouter();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);

  const Chip = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const ChipOrdeer = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const { mutate: mutateEnPreparacionVentaDirecta } =
    useMutationEnPreparacionVentaDirecta();

  const { mutate: mutateAsignarRepartidorVenta } =
    useMutationAsignarRepartidorVenta();

  const editDialog = () => {
    if (openEditDialog) {
      return (
        <AssignDeliveryDialogComponent
          rowItem={rowSelected}
          isOpen={openEditDialog}
          setOpen={setOpenEditDialog}
          authToken={authToken}
          cadets={cadets}
          venta={true}
          mutateAsignarRepartidor={mutateAsignarRepartidorVenta}
        />
      );
    }
    return;
  };

  const arrayOfColumns = [
    {
      field: "id",
      headerName: "Pedido n°",
      width: 90,
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
      field: "deliveryType",
      headerName: "Tipo de entrega",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "seguimiento",
      headerName: "N Seguimiento",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "statusPayment",
      headerName: "Estado pago",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        switch (params.value) {
          case 1:
            return <Chip type="Aprobado" />;
          case 2:
            return <Chip type="Pendiente" />;
          case 3:
            return <Chip type="Error" />;
          case 4:
            return <Chip type="Pendiente" />;
        }
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
      width: 250,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { orderData } = params.row;
        const { id } = orderData;

        const onClickEdit = () => {
          setRowSelected({ id });
          setOpenEditDialog(true);
          return;
        };

        const onClickEntregado = () => {
          const status = {
            clientStatusOrderId: purchaseStatusEnum.RECIBIDO,
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
                "La orden ha sido cambiada a Entregada!",
                "success"
              ).then(() => {
                router.reload();
              });
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

        const onClickEnCamino = () => {
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
            ) : orderData.clientStatusOrderId == 6 ||
              orderData.cadetId !== null ? (
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
            {orderData.clientStatusOrderId == 4 ? (
              <Fragment>
                <Tooltip title={`Cancelar order`} placement="top">
                  <IconButton>
                    <FaWindowClose style={{ fontSize: "1rem", color: "red" }} />
                  </IconButton>
                </Tooltip>
              </Fragment>
            ) : (
              ""
            )}
            <Fragment>
              <Tooltip title={`Ver orden`} placement="top">
                <IconButton>
                  <FaEye style={{ fontSize: "1rem", color: "red" }} />
                </IconButton>
              </Tooltip>
            </Fragment>
          </Fragment>
        );
      },
    },
  ];

  const arrayOfItems = arrayCompras.map((compra) => {
    return {
      id: compra.id,
      orderDate: formatDate(compra.createdAt.substr(0, 10)),
      deliveryType:
        compra.type === 2
          ? "Envio domicilio"
          : compra.clientAddressId === "Retiro Sucursal"
          ? "Retiro Sucursal"
          : "Envio Domicilio",
      quantity: compra.quantity,
      total: compra.total,
      seguimiento: compra.paymentCode,
      statusPayment: compra.clientStatusPaymentId,
      orderStatus: compra.clientStatusOrderId,
      orderData: compra,
      acciones: { compra: compra },
    };
  });

  return (
    <Fragment>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        checkboxSelection
        ventas={true}
        isRowSelectable={(params) =>
          params.row.orderData.clientStatusOrderId !== 8
        }
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
      {/* </div> */}
      {/* )} */}
      {editDialog()}
    </Fragment>
  );
};

export default ComprasTable;
