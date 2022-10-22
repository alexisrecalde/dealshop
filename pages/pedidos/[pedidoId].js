import { useQuery } from 'react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getOrderById } from '../../queries/orders/orders.queries';

import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { selectUserToken } from '../../redux/user/user.selector';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import ErrorComponent from '../../components/error/errorDefault.component';
import OrderDetailComponent from '../../components/orderDetail/orderDetail.component.jsx';

const DetalleOrden = (authToken) => {
    const router = useRouter();
    const { pedidoId } = router.query;

    const { isLoading, isError, data } = useQuery(['pedidoId', pedidoId], () =>
        getOrderById({ authToken: authToken.authToken, id: pedidoId })
    );

    const header = (pedidoId) => {
        return (
            <Head>
                <title>Dealshop - Pedido #{pedidoId}</title>
                <meta name="author" content="Dealshop" />
                <meta name="description" content="Detalle Pedido" key="title" />
                <meta name="owner" content="Dealshop" />
            </Head>
        );
    };

    if (isLoading) {
        return (
            <div>
                {header('Pedido')}
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
        <div>
            {header(data.id)}
            <OrderDetailComponent order={data} />
        </div>
    );
};

DetalleOrden.propTypes = {
    authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
    authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(DetalleOrden);
