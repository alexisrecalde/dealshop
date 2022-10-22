import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QueryObserver, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import getConfig from "next/config";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { styled } from "@mui/material/styles";

import { selectUserToken } from "../../redux/user/user.selector";
// import { getOrders } from "../../queries/orders/orders.queries";

import withAuth, { roles } from "../../utils/auth.utils";
import Spinner from "../../components/spinner/spinner.component";
import ErrorComponent from "../../components/error/errorDefault.component";
import DeliveriesFilterComponent from "../../components/filters/deliveriesFilter/deliveriesFilter.component";
import DeliveriesDetailTableComponent from "../../components/dataGrid/deliveriesDetailTable/deliveryDetailsTable.component";
import OrderStatusReferenceComponent from "../../components/dataGrid/ordersDetailTable/orderStatusReference.component";

const OrdersPage = ({ authToken }) => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const { query } = router;
  const [pagination, setPagination] = useState(0);
  const [offset, setOffset] = useState(0);

  const { cadetId, id, orderDateFrom, orderDateTo, clientName, location } =
    router.query;

  const getOrdersEnvios = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        deliveryTypeId: 1,
        id,
        orderDateFrom,
        orderDateTo,
        location,
        clientName,
        cadetId: cadetId ? cadetId : "notnull",
        statusId: "1,2,3",
      },
    };
    const url = `${publicRuntimeConfig.backend_url}/orders-envios?_page=${offset}&_limite=10`;
    const { data } = await axios.get(url, config);
    return data;
  };

  const { isLoading, data, error } = useQuery(
    ["ordersEnvios", offset, query],
    getOrdersEnvios,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 10000,
      // refetchIntervalInBackground: 2000
    }
  );

  // console.log(isLoading, data);

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
      <h2 style={{ color: "#e91e63" }}>Envíos</h2>
      <DeliveriesFilterComponent
        setPagination={setPagination}
        setOffset={setOffset}
      />
      <OrderStatusReferenceComponent />
      <DeliveriesDetailTableComponent
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
  row-gap: 20px;
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
