import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import CustomButtonComponent from "../../customButton/customButton.component";
import LocationInput from "../../input/locationInput/locationInput.component";
import SellerInput from "../../input/sellerInput/sellerInput.component";

import {
  SectionContainer,
  FiltersContainer,
  ActionsContainer,
  FilterHeader,
  SelectOption,
  RemoveFilters,
} from "./ordersFilter.styles";
import { InputTextOutlined, InputContainer } from "../../input/input.styles";
import { Header, Container } from "../filters.styles";
import { IoCalendarOutline } from "react-icons/io5";

const OrdersFilterComponent = ({
  sellers = [],
  todospedidos,
  setOffset,
  setPagination,
}) => {
  const router = useRouter();
  const query = router.query;
  const {
    deliveryTypeId,
    statusId,
    seller,
    id,
    orderDateFrom,
    orderDateTo,
    location,
  } = router.query;

  const [getValue, setValue] = useState({
    deliveryTypeId: deliveryTypeId ? deliveryTypeId : 0,
    statusId: statusId ? statusId : 0,
    sellerId: 0,
    id: 0,
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
      <Header>Filtrar pedidos por:</Header>
      <SectionContainer>
        <FiltersContainer>
          <FormControl>
            <FilterHeader>Vendedor</FilterHeader>
            <SellerInput
              getValue={getValue}
              setValue={setValue}
              data={sellers}
            />
          </FormControl>
          <InputContainer>
            <FilterHeader>Método de entrega</FilterHeader>
            <SelectOption
              id="deliveryTypeId"
              name="deliveryTypeId"
              onChange={onValueChange}
              variant="standard"
              value={
                getValue.deliveryTypeId == 0 && deliveryTypeId
                  ? deliveryTypeId
                  : getValue.deliveryTypeId
              }
            >
              <MenuItem value={0}>N/A</MenuItem>
              <MenuItem value={1}>Envío a domicilio</MenuItem>
              <MenuItem value={2}>Retiro por sucursal</MenuItem>
              <MenuItem value={3}>Venta por mostrador</MenuItem>
            </SelectOption>
          </InputContainer>
          <InputContainer>
            <FilterHeader>Estado</FilterHeader>
            <SelectOption
              id="statusId"
              name="statusId"
              variant="standard"
              onChange={onValueChange}
              value={
                getValue.statusId == 0 && statusId
                  ? statusId
                  : getValue.statusId
              }
            >
              <MenuItem value={0}>N/A</MenuItem>
              <MenuItem value={1}>Nuevo (N)</MenuItem>
              <MenuItem value={2}>En Camino (EC)</MenuItem>
              <MenuItem value={3}>Entregado (E)</MenuItem>
              <MenuItem value={4}>Devuelto (D)</MenuItem>
              <MenuItem value={6}>Vencido (VC)</MenuItem>
              <MenuItem value={5}>Cancelado (C)</MenuItem>
            </SelectOption>
          </InputContainer>
          {deliveryTypeId == 3 || deliveryTypeId == 2 ? null : (
            <FormControl>
              <FilterHeader>Localidad</FilterHeader>
              <LocationInput getValue={getValue} setValue={setValue} />
            </FormControl>
          )}
          <FormControl>
            <FilterHeader>Fecha</FilterHeader>
            <DayPickerInput
              component={(props, ref) => (
                <InputTextOutlined
                  id="orderDateFrom"
                  label="Desde"
                  variant="outlined"
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
                  variant="outlined"
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
          <FormControl>
            <FilterHeader>Pedido</FilterHeader>
            <InputTextOutlined
              id="id"
              name="id"
              label="N°"
              type="number"
              variant="outlined"
              defaultValue={id}
              onChange={onValueChange}
            />
          </FormControl>
        </FiltersContainer>
        <ActionsContainer>
          <CustomButtonComponent
            color="secondary"
            onClick={() => {
              onClickParams();
            }}
          >
            filtrar
          </CustomButtonComponent>
          <RemoveFilters
            href={todospedidos ? "/admin/todoslospedidos" : "/admin/pedidos"}
          >
            Limpiar filtros
          </RemoveFilters>
        </ActionsContainer>
      </SectionContainer>
    </Container>
  );
};

export default OrdersFilterComponent;
