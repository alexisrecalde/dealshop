import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import axios from "axios";
import getConfig from "next/config";
import { selectUserId, selectUserToken } from "../redux/user/user.selector";
import { getOrders } from "../queries/orders/orders.queries";

import withAuth, { roles } from "../utils/auth.utils";
import Spinner from "../components/spinner/spinner.component";
import ErrorComponent from "../components/error/errorDefault.component";
import SellerOrdersDetailTableComponent from "../components/dataGrid/ordersDetailTable/sellerOrderDetailsTable.component";
import OrderStatusReferenceComponent from "../components/dataGrid/ordersDetailTable/orderStatusReference.component";

const MyOrdersPage = ({ authToken, userId }) => {
  //   const { isLoading, isError, data } = useQuery(
  //     ["orders", { authToken, sellerId: userId }],
  //     getOrders
  //   );
  const router = useRouter();
  const { query } = router;
  const { publicRuntimeConfig } = getConfig();
  const [pagination, setPagination] = useState(0);
  const [offset, setOffset] = useState(0);

  const getOrdersMisPedidos = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        sellerId: userId,
      },
    };
    const url = `${publicRuntimeConfig.backend_url}/orders?_page=${offset}&_limite=10`;
    const { data } = await axios.get(url, config);
    return data;
  };

  const { isLoading, data, error } = useQuery(
    ["ordersMisPedidos", offset, query],
    getOrdersMisPedidos,{
      staleTime: 0,
    }
  );

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Mis Pedidos</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Mis Pedidos" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  // if (isLoading) {
  //     return (
  //         <div>
  //             {header()}
  //             <Spinner />
  //         </div>
  //     );
  // }

  // if (isError) {
  //     return (
  //         <div style={{ padding: '20px' }}>
  //             {header()}
  //             <ErrorComponent />
  //         </div>
  //     );
  // }

  return (
    <PageContainer>
      {header()}
      <h2 style={{ color: "#e91e63", marginBlockEnd: "0rem" }}>Pedidos</h2>
      <p
        style={{
          fontStyle: "italic",
          marginBlockStart: "0rem",
          marginBlockEnd: "0rem",
        }}
      >
        En caso de necesitar cancelar o modificar un pedido, por favor
        contactarse con la administración
      </p>
      <OrderStatusReferenceComponent />
      <SellerOrdersDetailTableComponent
        // orders={data.results}
        showStrip={false}
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

MyOrdersPage.propTypes = {
  authToken: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
  userId: selectUserId,
});

export default withAuth(connect(mapStateToProps, null)(MyOrdersPage), [
  roles.SUPER_ADMIN,
  roles.ADMIN,
  roles.VENDEDOR,
]);
