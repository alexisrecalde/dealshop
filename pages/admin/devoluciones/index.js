import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { styled } from "@mui/material/styles";
import axios from "axios";
import getConfig from "next/config";
import { selectUserToken } from "../../../redux/user/user.selector";
import { getOrders } from "../../../queries/orders/orders.queries";

import withAuth, { roles } from "../../../utils/auth.utils";
import Spinner from "../../../components/spinner/spinner.component";
import ErrorComponent from "../../../components/error/errorDefault.component";
import DevolucionesFilterComponent from "../../../components/filters/devolucionesFilter/devolucionesFilter.component";
import DevolucionesDetailTableComponent from "../../../components/dataGrid/devolucionesDetailTable/devolucionesDetailsTable.component";
import OrderStatusReferenceComponent from "../../../components/dataGrid/ordersDetailTable/orderStatusReference.component";

const DevolucionesPage = ({ authToken }) => {
  const router = useRouter();
  const { query } = router;
  const { publicRuntimeConfig } = getConfig();
  const [pagination, setPagination] = useState(0);
  const [offset, setOffset] = useState(0);
  const { sellerId, id, orderDateFrom, orderDateTo, clientName, location } =
    router.query;

  const getOrdersDevoluciones = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        // deliveryTypeId: 1,
        sellerId,
        id,
        orderDateFrom,
        orderDateTo,
        location,
        clientName,
        statusId: "3, 4",
      },
    };
    const url = `${publicRuntimeConfig.backend_url}/orders-devoluciones?_page=${offset}&_limite=10`;
    const { data } = await axios.get(url, config);
    return data;
  };

  const { isLoading, data, isError } = useQuery(
    ["ordersAll", offset, query],
    getOrdersDevoluciones,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 9000,
    }
  );

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Devoluciones</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Devoluciones" key="title" />
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
      <h2 style={{ color: "#e91e63" }}>Devoluciones</h2>
      <DevolucionesFilterComponent
        setPagination={setPagination}
        setOffset={setOffset}
      />
      <OrderStatusReferenceComponent />
      <DevolucionesDetailTableComponent
        // orders={data.results}
        // authToken={authToken}

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
  row-gap: 20px;
  background-image: url('/img/Sprinkle.svg');
`;

DevolucionesPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(DevolucionesPage), [
  roles.SUPER_ADMIN,
  roles.ADMIN,
]);
