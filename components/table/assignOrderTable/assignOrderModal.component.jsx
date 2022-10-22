import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

import CustomButtonComponent from "../../customButton/customButton.component";
import SellerInput from "../../input/sellerInput/sellerInput.component";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useState } from "react";
import { patchOrder } from "../../../queries/orders/orders.queries";

const AssignOrderModalComponent = ({
  isOpen,
  setIsOpen,
  rowItem,
  sellers,
  authToken,
  mutateAsignarVendedor,
}) => {
  const router = useRouter();
  const [getSellerId, setSellerId] = useState({ sellerId: 0 });

  const handleClose = () => {
    setIsOpen(false);
  };

  const onAssignOrderClick = async () => {
    Swal.fire({
      title: `¿Está seguro que desea asignar la orden al vendedor?`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      customClass: {
        container: "",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        mutateAsignarVendedor({
          id: rowItem.id,
          authToken,
          sellerId: getSellerId.sellerId,
        });
        // await patchOrder({ id: rowItem.id, authToken, sellerId: getSellerId.sellerId });
        Swal.fire("Listo!", "La orden ha sido asignada", "success").then(() => {
          handleClose();
          // router.reload().then(() => window.scrollTo(0, 0));
        });
      }
    });
  };

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Asignar Orden N° {rowItem ? rowItem.id : ""}
        </DialogTitle>
        <DialogContent>
          <SellerInput
            getValue={getSellerId}
            setValue={setSellerId}
            data={sellers}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <CustomButtonComponent
            color="secondary"
            style={{ width: "100%" }}
            onClick={onAssignOrderClick}
          >
            Asignar
          </CustomButtonComponent>
          <CustomButtonComponent
            color="primary"
            style={{ width: "100%" }}
            onClick={handleClose}
          >
            Cancelar
          </CustomButtonComponent>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AssignOrderModalComponent;
