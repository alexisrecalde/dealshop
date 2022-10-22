import { Fragment } from "react";

import {
  OrderStatusesContainer,
  OrderStatusContainer,
  StatusReference,
  StatusReferenceText,
} from "./orderDetailsTable.styles";

const OrderStatusReferenceComponent = () => {
  return (
    <Fragment>
      <OrderStatusesContainer>
        <OrderStatusContainer>
          <StatusReference color="#FFEB3B">N</StatusReference>
          <StatusReferenceText>Nuevo</StatusReferenceText>
        </OrderStatusContainer>
        <OrderStatusContainer>
          <StatusReference color="#FF9800">EC</StatusReference>
          <StatusReferenceText>En Camino</StatusReferenceText>
        </OrderStatusContainer>
        <OrderStatusContainer>
          <StatusReference color="#8BC34A">E</StatusReference>
          <StatusReferenceText>Entregado</StatusReferenceText>
        </OrderStatusContainer>
        <OrderStatusContainer>
          <StatusReference color="#009688">D</StatusReference>
          <StatusReferenceText>Devuelto</StatusReferenceText>
        </OrderStatusContainer>
        <OrderStatusContainer>
          <StatusReference color="#e91e63">DP</StatusReference>
          <StatusReferenceText>Devuelto Parcialmente</StatusReferenceText>
        </OrderStatusContainer>
        <OrderStatusContainer>
          <StatusReference color="#05dcf6">VC</StatusReference>
          <StatusReferenceText>Vencido</StatusReferenceText>
        </OrderStatusContainer>
        <OrderStatusContainer>
          <StatusReference color="#607D8B">C</StatusReference>
          <StatusReferenceText>Cancelado</StatusReferenceText>
        </OrderStatusContainer>
      </OrderStatusesContainer>
    </Fragment>
  );
};

export default OrderStatusReferenceComponent;
