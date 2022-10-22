import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import CustomButtonComponent from "../../customButton/customButton.component";
import DataGridTable from "../dataGridTable.component";
import { InputContainer, InputQty } from "./refundTable.styles";

import { refundOrder } from "../../../queries/orders/orders.queries";

const RefundTableComponent = ({
  authToken,
  orderId,
  statusId,
  items,
  setOpen,
}) => {
  const router = useRouter();
  const [getReturnedItems, setReturnedItems] = useState([]);

  const onChangeValue = (e, item, setErrorStatus) => {
    e.preventDefault();
    const value = parseInt(e.target.value);

    const itemExists = getReturnedItems.find(
      (returnedItem) => returnedItem.id == item.id
    );
    const itemsToReturn = itemExists
      ? getReturnedItems.filter((returnedItem) => returnedItem.id != item.id)
      : getReturnedItems;

    if (value > item.quantityReturnable) {
      setErrorStatus(true);
    } else {
      setErrorStatus(false);
      const returnedItem = {
        id: item.id,
        productId: item.productId,
        quantityReturned: value,
      };

      itemsToReturn.push(returnedItem);
    }

    setReturnedItems([...itemsToReturn]);
  };

  const onReturnItems = () => {
    if (getReturnedItems.length === 0) {
      Swal.fire(
        "Error!",
        "Tenés que seleccionar los productos a devolver, antes de continuar.",
        "warning"
      );
    } else {
      Swal.fire({
        icon: "question",
        title: "Deseas confirmar la devolución de los productos seleccionados?",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#e91e63",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
          if (statusId == 3 || statusId == 4) {
            setOpen(true);
            refundOrder(authToken, orderId, getReturnedItems).then(() => {
              setOpen(false);
              Swal.fire(
                "Listo!",
                "La devolución ha sido procesada!",
                "success"
              ).then(() => {
                router.reload(`/admin/devoluciones/${orderId}`);
              });
            });
          } else {
            Swal.fire(
              "Error!",
              "Esta orden no puede ser devuelta",
              "error"
            ).then(() => {
              router
                .push("/admin/devoluciones")
                .then(() => window.scrollTo(0, 0));
            });
          }
        }
      });
    }
  };

  const arrayOfColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Producto",
      width: 500,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantityReturnable",
      headerName: "Cantidad",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantityToReturn",
      headerName: "Cantidad a devolver",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const [getErrorStatus, setErrorStatus] = useState(false);
        return (
          <InputContainer>
            <InputQty
              disabled={params.value.quantityReturnable == 0 ? true : false}
              placeholder={params.value.quantityReturnable.toString()}
              onChange={(e) => onChangeValue(e, params.value, setErrorStatus)}
              error={getErrorStatus}
              helperText={getErrorStatus ? "Excede la cantidad ordenada" : ""}
            />
          </InputContainer>
        );
      },
    },
  ];

  const arrayOfItems = items.map((item) => {
    return {
      id: item.id,
      name: item.product.name,
      quantityReturnable: item.quantityReturnable,
      quantityToReturn: item,
    };
  });

  return (
    <Fragment>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        density="comfortable"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 0px",
          position: "relative",
          zIndex: 1000,
        }}
      >
        <CustomButtonComponent
          color="secondary"
          style={{ fontSize: "1rem", padding: "10px", height: "60px" }}
          onClick={onReturnItems}
        >
          Procesar Devolución
        </CustomButtonComponent>
      </div>
    </Fragment>
  );
};

export default RefundTableComponent;
