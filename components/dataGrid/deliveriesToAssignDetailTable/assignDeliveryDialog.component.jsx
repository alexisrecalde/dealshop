import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

import CustomButtonComponent from "../../customButton/customButton.component";
import CadetInput from "../../input/cadetInput/cadetInput.component";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useState } from "react";
import { patchOrder } from "../../../queries/orders/orders.queries";

const AssignDeliveryDialogComponent = ({
  isOpen,
  setOpen,
  rowItem,
  authToken,
  cadets,
  mutateAsignarRepartidor,
  mutateAsignarRepartidorMultiple,
}) => {
  const router = useRouter();
  const [getCadetId, setCadetId] = useState({ cadetId: 0 });

  const handleClose = () => {
    setOpen(false);
  };

  const onAssignOrderClick = async () => {
    Swal.fire({
      title: `¿Está seguro que desea asignar la orden al cadete?`,
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
        if (getCadetId.cadetId == 0) {
          Swal.fire("Error!", "Debe asignar un cadete al pedido", "error");
          return true;
        }
        if (rowItem.id) {
          mutateAsignarRepartidor({
            id: rowItem.id,
            authToken,
            cadetId: getCadetId.cadetId,
          });
        } else {
          mutateAsignarRepartidorMultiple({
            id: rowItem,
            authToken,
            cadetId: getCadetId.cadetId,
          });
        }
        Swal.fire("Listo!", "La orden ha sido asignada", "success");
        handleClose();
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
          <CadetInput
            getValue={getCadetId}
            setValue={setCadetId}
            data={cadets}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <CustomButtonComponent
            color="secondary"
            disabled={cadets.length == 0}
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

export default AssignDeliveryDialogComponent;
