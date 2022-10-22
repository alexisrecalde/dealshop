import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import Head from "next/head";
import axios from "axios";
import getConfig from "next/config";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { styled } from "@mui/material/styles";

import { selectUserToken } from "../../redux/user/user.selector";
import withAuth, { roles } from "../../utils/auth.utils";
import OrdersFilterComponent from "../../components/filters/ordersFilter/ordersFilter.component";
import OrdersDetailTableComponent from "../../components/dataGrid/ordersDetailTable/orderDetailsTable.component";
import OrderStatusReferenceComponent from "../../components/dataGrid/ordersDetailTable/orderStatusReference.component";

const OrdersPage = ({ authToken }) => {
  const router = useRouter();
  const { query } = router;
  const {
    deliveryTypeId,
    statusId,
    sellerId,
    id,
    orderDateFrom,
    orderDateTo,
    location,
  } = router.query;
  const { publicRuntimeConfig } = getConfig();
  const [pagination, setPagination] = useState(0);
  const [offset, setOffset] = useState(0);

  const getOrdersAll = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        deliveryTypeId,
        statusId,
        sellerId,
        id,
        orderDateFrom,
        orderDateTo,
        location,
      },
    };
    const url = `${publicRuntimeConfig.backend_url}/orders?_page=${offset}&_limite=10`;
    const { data } = await axios.get(url, config);
    return data;
  };

  // const renderMemo = useMemo(() => function, input);

  const { isLoading, data, isError } = useQuery(
    ["ordersAll", offset, query],
    getOrdersAll,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 9000,
    }
  );

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

  return (
    <PageContainer>
      {header()}
      <h2 style={{ color: "#e91e63" }}>Pedidos</h2>
      <OrdersFilterComponent
        setPagination={setPagination}
        setOffset={setOffset}
      />
      <OrderStatusReferenceComponent />
      <OrdersDetailTableComponent
        isError={isError}
        isLoading={isLoading}
        orders={data}
        total={data}
        authToken={authToken}
        setPage={setOffset}
        page={offset}
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
  background-image: url('/img/Sprinkle.svg');
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
