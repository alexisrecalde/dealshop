import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { selectUserToken, selectUser } from '../redux/user/user.selector';
import { getOrders } from '../queries/orders/orders.queries';

import Spinner from '../components/spinner/spinner.component';
import ErrorComponent from '../components/error/errorDefault.component';
import DeliveredTableComponent from '../components/dataGrid/deliveriesDetailTable/deliveredTable.component';
import DeliveryTableVentasDirecta from '../components/dataGrid/deliveriesDetailTable/deliveryTableVentasDirectas';
import { getPedidosByCadetIdEntregados } from '../queries/users/users.queries';

const MyDeliveriesPage = ({ user, authToken }) => {
  const router = useRouter();
  const { sellerId, id, orderDateFrom, orderDateTo, clientName, location } = router.query;

  const { isLoading, isError, data } = useQuery(
    [
      'orders',
      {
        authToken,
        deliveryTypeId: 1,
        sellerId,
        id,
        orderDateFrom,
        orderDateTo,
        location,
        clientName,
        cadetId: user.userId,
        statusId: '3',
      },
    ],
    getOrders
  );

  const getPedidosRepartidorEntregados = async () => {
    const idRepartidor = user.userId;
    const datos = await getPedidosByCadetIdEntregados({ authToken, idRepartidor });
    return datos;
  };

  const {
    data: dataR,
    error: errorR,
    loading: landingR,
  } = useQuery(["ventas"], getPedidosRepartidorEntregados, {
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 2000,
  });

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

  if (isLoading) {
    return (
      <div>
        {header()}
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '20px' }}>
        {header()}
        <ErrorComponent />
      </div>
    );
  }

  return (
    <PageContainer>
      {header()}
      <h2 style={{ color: '#e91e63' }}>Mis Entregas</h2>
      <DeliveredTableComponent orders={data.results} authToken={authToken} />
      <DeliveryTableVentasDirecta
        orders={dataR}
        authToken={authToken}
        isLoading={landingR}
        isError={errorR}
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

MyDeliveriesPage.propTypes = {
  authToken: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
  user: selectUser,
});

export default connect(mapStateToProps, null)(MyDeliveriesPage);
