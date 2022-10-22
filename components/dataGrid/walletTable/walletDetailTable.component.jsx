import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { GiMoneyStack } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import Button from "@mui/material/Button";
import DataGridTable from "../dataGridTable.component";
import { CurrencyText } from "../../../utils/number.utils";
import { DataContainer } from "./walletTable.styles";
import { doPayMovement } from "../../../queries/wallet/wallet.queries";
import { formatDate } from "../../../utils/general.utils";
import ItemBilleteraModal from "./itemBilleteraModal";
import ReactDOMServer from "react-dom/server";

const WalletDetailTableComponent = ({
  authToken,
  balance,
  movements,
  isAdmin,
  setOpen,
}) => {
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const itemBilleteraModal = (item) => {
    const userModal = <ItemBilleteraModal item={item} />;
    Swal.fire({
      html: ReactDOMServer.renderToStaticMarkup(userModal),
      reverseButtons: true,
      confirmButtonColor: "#00bcd4",
      confirmButtonText: "Cerrar",
    });
  };

  const arrayOfColumns = [
    {
      field: "date",
      headerName: "Fecha",
      width: mobileView ? 95 : isAdmin ? 160 : 300,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if (params.value) {
          return (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                onClick={() => {
                  itemBilleteraModal(params.row);
                }}
              >
                {formatDate(params.value.substr(0, 10))}
              </p>
            </div>
          );
        }
      },
    },
    {
      field: "description",
      headerName: "Descripción",
      width: mobileView ? 120 : 400,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <DataContainer>
            <p
              value={params.value}
              onClick={() => {
                itemBilleteraModal(params.row);
              }}
            >
              {params.value}
            </p>
          </DataContainer>
        );
      },
    },
    {
      field: "amount",
      headerName: "Importe",
      width: mobileView ? 90 : 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <DataContainer>
            <CurrencyText
              value={params.value}
              onClick={() => {
                itemBilleteraModal(params.row);
              }}
            />
          </DataContainer>
        );
      },
    },
    {
      field: "balance",
      headerName: "Saldo",
      width: mobileView ? 90 : 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <DataContainer>
            <CurrencyText
              value={params.value}
              onClick={() => {
                itemBilleteraModal(params.row);
              }}
            />
          </DataContainer>
        );
      },
    },
  ];

  const actionColumn = {
    field: "isPaid",
    headerName: "Acciones",
    width: mobileView ? 90 : 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const { order } = params.row;
      const { id, isPayed, orderId, description, amount } = order;

      const selling = order.seller ? order.saleId : orderId;

      const onClickPay = (id) => {
        Swal.fire({
          title: `Estás seguro de que querés realizar el pago de la entrega del pedido n° ${selling}?`,
          showCancelButton: true,
          confirmButtonColor: "#e91e63",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Confirmar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setOpen(true);
            doPayMovement(authToken, id)
              .then(() => {
                setOpen(false);
                Swal.fire({
                  title: "Listo!",
                  text: "Se realizó el pago",
                  icon: "success",
                  confirmButtonColor: "#00bcd4",
                }).then(() => {
                  router.reload().then(() => window.scrollTo(0, 0));
                });
              })
              .catch(() => {
                setOpen(false);
                Swal.fire({
                  title: "Error!",
                  text: "No se pudo realizar el pago, por favor intente más tarde",
                  icon: "error",
                  confirmButtonColor: "#00bcd4",
                }).then(() => {
                  router.reload().then(() => window.scrollTo(0, 0));
                });
              });
          }
        });
      };

      return (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {description.includes("Comisión") && (
            <Tooltip title="Ver detalle" placement="top">
              <IconButton
                onClick={() => router.push(`/pedidos/${orderId}`)}
                size="large"
              >
                <FaEye style={{ fontSize: "1.6rem", color: "#00bcd4" }} />
              </IconButton>
            </Tooltip>
          )}
          {isPayed == false && balance >= amount && (
            <Tooltip title="Pagar entrega" placement="top">
              <IconButton onClick={() => onClickPay(id)} size="large">
                <GiMoneyStack
                  style={{ fontSize: "1.8rem", color: "#e06e96" }}
                />{" "}
              </IconButton>
            </Tooltip>
          )}
        </div>
      );
    },
  };

  const arrayOfRows = movements.map((movement) => {
    return {
      id: movement.id,
      date: movement.date,
      description: movement.description,
      amount: movement.amount,
      balance: movement.balance,
      order: movement,
    };
  });

  return (
    <Fragment>
      <h3 style={{ color: "#e91e63" }}>Movimientos</h3>
      <DataGridTable
        columns={isAdmin ? [...arrayOfColumns, actionColumn] : arrayOfColumns}
        rows={arrayOfRows}
        sortModel={[
          {
            field: "date",
            sort: "desc",
          },
        ]}
      />
    </Fragment>
  );
};

export default WalletDetailTableComponent;
