import React from "react";
import FormControl from "@mui/material/FormControl";
import { FilterHeader } from "../../../filters/ordersFilter/ordersFilter.styles";
import Input from "@mui/material/Input";
import Link from "next/link";
import { formatDate } from "../../../../utils/general.utils";
import styled from "styled-components";

export default function ItemBilleteraModal({ item }) {
  return (
    <Container>
      <FormControl disabled style={{ margin: "10px 0" }}>
        <FilterHeader>Fecha</FilterHeader>
        <InputDisplay
          id="Fecha"
          label="Fecha"
          variant="outlined"
          value={formatDate(item.date.substr(0, 10))}
          fullWidth
        />
      </FormControl>
      <FormControl disabled style={{ margin: "10px 0" }}>
        <FilterHeader>Description</FilterHeader>
        <InputDisplay
          id="Description"
          label="Description"
          variant="outlined"
          value={item.description}
          fullWidth
        />
      </FormControl>
      <FormControl disabled style={{ margin: "10px 0" }}>
        <FilterHeader>Importe</FilterHeader>
        <InputDisplay
          id="Importe"
          label="Importe"
          variant="outlined"
          value={`$ ${item.amount}`}
          fullWidth
        />
      </FormControl>
      <div>
        {item.order.seller ? (
          <Link href={`/admin/clientes/comprasId/${item.order.saleId}`}>
            <a style={{ color: "#00bcd4", fontWeight: "500" }}>Ver Pedido</a>
          </Link>
        ) : (
          <Link href={`/pedidos/${item.order.orderId}`}>
            <a style={{ color: "#00bcd4", fontWeight: "500" }}>Ver Pedido</a>
          </Link>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputDisplay = styled(Input)`
  & input {
    text-align: center;
  }

  & :after {
    border-color: #00bcd4;
  }
`;
