import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import CustomButtonComponent from "../../customButton/customButton.component";
import LocationInput from "../../input/locationInput/locationInput.component";
import CadetInput from "../../input/cadetInput/cadetInput.component";

import {
  Container,
  Header,
  SectionContainer,
  FiltersContainer,
  ActionsContainer,
  FilterHeader,
  RemoveFilters,
} from "./deliveriesFilter.styles";
import { InputTextOutlined } from "../../input/input.styles";
import { IoCalendarOutline } from "react-icons/io5";

const DeliveriesFilterComponent = ({
  isMyDeliveries = false,
  setPagination,
  setOffset,
}) => {
  const router = useRouter();
  const query = router.query;
  const { id, clientName } = router.query;

  const [getValue, setValue] = useState({
    deliveryTypeId: 0,
    cadetId: 0,
    id: 0,
    clientName: "",
    orderDateFrom: "",
    orderDateTo: "",
    location: "",
  });

  const onClickParams = () => {
    setPagination(0);
    setOffset(0);
    const filters = { ...getValue };
    const queryParams = { ...query };

    for (const key in filters) {
      if (filters[key] != 0 && filters[key] != "") {
        queryParams[key] = filters[key];
      } else {
        delete queryParams[key];
      }
    }

    router
      .push({
        query: queryParams,
      })
      .then(() => window.scrollTo(0, 0));
  };

  const onValueChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value });
  };

  const onDayChange = (day, name) => {
    const date = new Date(day).toJSON();
    if (date != null && date.length > 10) {
      setValue({ ...getValue, [`${name}`]: date.slice(0, 10) });
    }
  };

  return (
    <Container>
      <Header>Filtrar envíos por:</Header>
      <SectionContainer>
        <FiltersContainer>
          {!isMyDeliveries && (
            <FormControl>
              <FilterHeader>Repartidor</FilterHeader>
              <CadetInput getValue={getValue} setValue={setValue} />
            </FormControl>
          )}
          <FormControl>
            <FilterHeader>Localidad</FilterHeader>
            <LocationInput getValue={getValue} setValue={setValue} />
          </FormControl>
          <FormControl>
            <FilterHeader>N° de Pedido</FilterHeader>
            <InputTextOutlined
              id="id"
              name="id"
              type="number"
              variant="outlined"
              defaultValue={id}
              onChange={onValueChange}
            />
          </FormControl>
          <FormControl>
            <FilterHeader>Nombre de Cliente</FilterHeader>
            <InputTextOutlined
              id="clientName"
              name="clientName"
              type="string"
              // variant="outlined"
              defaultValue={clientName}
              onChange={onValueChange}
            />
          </FormControl>
          <FormControl>
            <FilterHeader>Fecha</FilterHeader>
            <DayPickerInput
              component={(props, ref) => (
                <InputTextOutlined
                  id="orderDateFrom"
                  label="Desde"
                  // variant="outlined"
                  fullWidth
                  {...props}
                  {...ref}
                />
              )}
              onDayChange={(day) => onDayChange(day, "orderDateFrom")}
              placeholder="YYYY-MM-DD"
              dayPickerProps={{
                months: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ],
                weekdaysLong: [
                  "Domingo",
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                ],
                weekdaysShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
              }}
              style={{ width: "100%" }}
            />
          </FormControl>
          <FormControl>
            <IoCalendarOutline
              style={{ fontSize: "1.4rem", marginBottom: "0.7rem" }}
            />
            <DayPickerInput
              component={(props, ref) => (
                <InputTextOutlined
                  id="orderDateTo"
                  label="Hasta"
                  // variant="outlined"
                  fullWidth
                  {...props}
                  {...ref}
                />
              )}
              onDayChange={(day) => onDayChange(day, "orderDateTo")}
              placeholder="YYYY-MM-DD"
              dayPickerProps={{
                months: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ],
                weekdaysLong: [
                  "Domingo",
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                ],
                weekdaysShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
              }}
              style={{ width: "100%" }}
            />
          </FormControl>
        </FiltersContainer>
        <ActionsContainer>
          <CustomButtonComponent color="secondary" onClick={onClickParams}>
            Filtrar
          </CustomButtonComponent>
          <RemoveFilters
            onClick={() =>
              router
                .push({
                  query: {},
                })
                .then(() => window.scrollTo(0, 0))
            }
          >
            Limpiar filtros
          </RemoveFilters>
        </ActionsContainer>
      </SectionContainer>
    </Container>
  );
};

export default DeliveriesFilterComponent;
