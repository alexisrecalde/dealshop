import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { styled } from "@mui/material/styles";
import axios from "axios";
import getConfig from "next/config";
import { selectUserId, selectUserToken } from "../redux/user/user.selector";
import { getOrders } from "../queries/orders/orders.queries";

import withAuth, { roles } from "../utils/auth.utils";
import Spinner from "../components/spinner/spinner.component";
import ErrorComponent from "../components/error/errorDefault.component";
import SellerOrdersDetailTableComponent from "../components/dataGrid/ordersDetailTable/sellerOrderDetailsTable.component";
import OrderStatusReferenceComponent from "../components/dataGrid/ordersDetailTable/orderStatusReference.component";
import OrdersFilterComponent from "../components/filters/ordersFilter/ordersFilter.component";
import { getSubsellers } from "../queries/users/users.queries";

const SubSellersTrackPage = ({ authToken, userId }) => {
  const router = useRouter();
  const { query } = router;
  const [subsellers, setSubsellers] = useState([]);
  const { publicRuntimeConfig } = getConfig();
  const [pagination, setPagination] = useState(0);
  const [offset, setOffset] = useState(0);

  const {
    deliveryTypeId,
    statusId,
    sellerId,
    id,
    orderDateFrom,
    orderDateTo,
    location,
  } = router.query;

  const getOrdersSeguimiento = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        superSellerId: userId,
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

  const { isLoading, data, isError } = useQuery(
    ["ordersSeguimiento", offset, query],
    getOrdersSeguimiento,
    {
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  useEffect(async () => {
    const listOfSubsellers = await getSubsellers(authToken, userId);
    setSubsellers(listOfSubsellers);
  }, []);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Pedidos Sub Vendedores</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Pedidos Sub Vendedores" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <PageContainer>
      {header()}
      <h2 style={{ color: "#e91e63" }}>Pedidos hechos por sub vendedores</h2>
      <OrdersFilterComponent
        sellers={subsellers}
        setPagination={setPagination}
        setOffset={setOffset}
      />
      <OrderStatusReferenceComponent />
      <SellerOrdersDetailTableComponent
        showStrip={false}
        showInvoice={false}
        isSellerLeader={true}
        isLoading={isLoading}
        orders={data}
        // total={data}
        isError={isError}
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

SubSellersTrackPage.propTypes = {
  authToken: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
  userId: selectUserId,
});

export default withAuth(connect(mapStateToProps, null)(SubSellersTrackPage), [
  roles.SUPER_ADMIN,
  roles.ADMIN,
  roles.VENDEDOR,
]);
