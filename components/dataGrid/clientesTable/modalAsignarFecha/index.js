import { useState, Fragment } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import styled from "styled-components";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import CustomButtonComponent from "../../../customButton/customButton.component";

import { FilterHeader } from "../../../filters/ordersFilter/ordersFilter.styles";
import DateInput from "../../../input/dateInput/dateInput.component";

const ModalAsignarFecha = ({
  orden,
  authToken,
  setOpenAsignarFecha,
  mutateAsignarFecha
}) => {
  const [dateToDelivery, setDateToDelivery] = useState({ fecha: "" });
  const [loadSetDate, setLoadSetDate] = useState(false);

  const onDayChange = (day) => {
    let date = new Date(day).toJSON();
    if (date != null && date.length > 10) {
      setDateToDelivery({ fecha: date.slice(0, 10) });
    }
  };

  const getNextPickupDate = () => {
    let date = new Date();
    if (
      date.getHours() > 11 ||
      (date.getHours() === 11 && date.getMinutes() > 29)
    ) {
      date.setDate(date.getDate() + 1);
    }

    date.setHours(0, 0, 0, 0);
    return date;
  };

  const changeDate = () => {
    if (dateToDelivery.fecha) {
      if (orden.length > 1) {
      } else {
        setLoadSetDate(true);
        const body = {
          estimatedDeliveryDate: dateToDelivery.fecha,
        };
        const id = orden[0];
        mutateAsignarFecha(
          { id, body, authToken },
          {
            onSuccess: () => {
              setLoadSetDate(false);
              setOpenAsignarFecha(false);
              Swal.fire(
                "Listo!",
                "Se ha cambiado exitosamente la fecha de estimada de entrega",
                "success"
              );
            },
            onError: () => {
              Swal.fire(
                "Error!",
                "No se pudo cambiar la fecha de estimada de entrega",
                "error"
              ).then(() => setOpenAsignarFecha(false));
            },
          }
        );
      }
    } else {
      Swal.fire(
        "Indique una fecha!",
        "Por favor indique una fecha de estimada de entrega",
        "error"
      );
    }
  };

  return (
    <Container>
      <FormControl style={{ marginBottom: "20px" }}>
        <FilterHeader style={{ fontSize: "15px" }}>Ordenes:</FilterHeader>
        {orden.length > 1 ? (
          orden.map((el) => {
            return (
              <li>
                <span style={{ fontSize: "14px" }}>{el}</span>
              </li>
            );
          })
        ) : (
          <li>
            <span style={{ fontSize: "14px" }}>{orden}</span>
          </li>
        )}
      </FormControl>
      <DateInput
        id="fecha"
        label="Fecha de entrega"
        required={true}
        onChange={onDayChange}
        disabledDays={true}
        nextDateFunc={getNextPickupDate}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      />
      <ButtonContainer>
        <CustomButtonComponent
          style={{ margin: "20px auto", width: "50%" }}
          color="secondary"
          onClick={() => changeDate()}
          // disabled={!getValue.dataHasBeenModified}
        >
          {loadSetDate ? (
            <CircularProgress
              style={{ color: "white" }}
              size={25}
            ></CircularProgress>
          ) : (
            "Cambiar fecha de entrega"
          )}
        </CustomButtonComponent>
      </ButtonContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ModalAsignarFecha;
