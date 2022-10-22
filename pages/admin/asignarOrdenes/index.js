import { useRouter } from "next/router";
import Head from "next/head";
import { connect } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { styled } from "@mui/material/styles";
import axios from "axios";
import getConfig from "next/config";

import { selectUserToken } from "../../../redux/user/user.selector";
import { getOrdersAxios } from "../../../queries/orders/orders.queries";
import { getAllSellers } from "../../../queries/users/users.queries";

import withAuth, { roles } from "../../../utils/auth.utils";
import Spinner from "../../../components/spinner/spinner.component";
import ErrorComponent from "../../../components/error/errorDefault.component";
import OrdersFilterComponent from "../../../components/filters/ordersFilter/ordersFilter.component";
import AssignOrderTableComponent from "../../../components/table/assignOrderTable/assignOrderTable.component";
import { useEffect, useState } from "react";

const AssignOrdersPage = ({ authToken }) => {
  const router = useRouter();
  const { query } = router;
  const { deliveryTypeId, id, orderDateFrom, orderDateTo, location } =
    router.query;

  const [sellers, setSellers] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  const { publicRuntimeConfig } = getConfig();
  const [pagination, setPagination] = useState(0);
  const [offset, setOffset] = useState(0);

  const ordersAllToAssing = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        deliveryTypeId,
        id,
        orderDateFrom,
        orderDateTo,
        location,
        sellerId: "null",
      },
    };
    const url = `${publicRuntimeConfig.backend_url}/orders?_page=${offset}&_limite=10`;
    const { data } = await axios.get(url, config);
    return data;
  };

  useEffect(() => {
    // setIsLoading(true);

    const retrieveAllSellers = async () => {
      try {
        const retrievedSellers = await getAllSellers(authToken);
        setSellers(retrievedSellers);
        setOrders(getOrders.results);
        // setIsLoading(false);
      } catch (e) {
        // setIsLoading(false);
        // setIsError(true);
      }
    };

    retrieveAllSellers();
  }, [deliveryTypeId, id, orderDateFrom, orderDateTo, location]);

  const { isLoading, data, isError } = useQuery(
    ["ordersAllToAssing", offset, query],
    ordersAllToAssing,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 9000,
    }
  );

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Asignar órdenes</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Asignar ordenes" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <PageContainer>
      {header()}
      <h2 style={{ color: "#e91e63" }}>Asignar Órdenes</h2>
      <OrdersFilterComponent
        setPagination={setPagination}
        setOffset={setOffset}
      />
      {/* {orders != undefined ? ( */}
      <AssignOrderTableComponent
        sellers={sellers}
        // orders={orders}
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
      {/* ) : (
        <h2>No hay órdenes sin asignar</h2>
      )} */}
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

AssignOrdersPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(AssignOrdersPage), [
  roles.SUPER_ADMIN,
  roles.ADMIN,
]);
