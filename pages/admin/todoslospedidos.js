import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";

import { selectUserToken } from "../../redux/user/user.selector";
import { getOrders } from "../../queries/orders/orders.queries";

import withAuth, { roles } from "../../utils/auth.utils";
import Spinner from "../../components/spinner/spinner.component";
import ErrorComponent from "../../components/error/errorDefault.component";
import OrdersFilterComponent from "../../components/filters/ordersFilter/ordersFilter.component";
import OrdersAllDetailTableComponent from "../../components/dataGrid/ordersDetailTable/ordersAllDetailsTable.component";
import OrderStatusReferenceComponent from "../../components/dataGrid/ordersDetailTable/orderStatusReference.component";

const OrdersPage = ({ authToken }) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState(0);

  // const { isLoading, isError, data } = useQuery(
  //   ['orders', { authToken, deliveryTypeId, statusId, sellerId, id, orderDateFrom, orderDateTo, location }],
  //   getOrders
  // );

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Pedidos</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Pedidos" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  // if (isLoading) {
  //   return (
  //     <div>
  //       {header()}
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div style={{ padding: '20px' }}>
  //       {header()}
  //       <ErrorComponent />
  //     </div>
  //   );
  // }

  return (
    <PageContainer>
      {header()}
      <h2 style={{ color: "#e91e63" }}>Pedidos</h2>
      <OrdersFilterComponent todospedidos={true} setOffset={setOffset} setPagination={setPagination}/>
      <OrderStatusReferenceComponent />
      <OrdersAllDetailTableComponent
        authToken={authToken}
        offset={offset}
        setOffset={setOffset}
        setPagination={setPagination}
        pagination={pagination}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 20px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

OrdersPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(OrdersPage), [
  roles.SUPER_ADMIN,
  roles.ADMIN,
]);
