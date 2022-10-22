import Head from 'next/head';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import withAuth, { roles } from '../utils/auth.utils';
import { selectUserToken, selectUserWalletId } from '../redux/user/user.selector';
import { getWalletById } from '../queries/wallet/wallet.queries';

import Spinner from '../components/spinner/spinner.component';
import ErrorComponent from '../components/error/errorDefault.component';
import WalletDetailTableComponent from '../components/dataGrid/walletTable/walletDetailTable.component';
import WalletCardComponent from '../components/card/walletCard/walletCard.component';

const BilleteraDetailPage = ({ authToken, walletId }) => {
  const { isLoading, isError, data } = useQuery(['productId', walletId], () => getWalletById(walletId, authToken));

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Billetera</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Administración de billetera usuario en Dealshop" key="title" />
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
    <div>
      {header()}
      <Container>
        <h2 style={{ color: '#e91e63', marginBlockEnd: '0' }}>Mi Billetera</h2>
        <WalletCardComponent balance={data.balance} />
        <WalletDetailTableComponent movements={data.movements} />
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding: 30px 100px;
  display: flex;
  flex-direction: column;
  min-height: 45vh;
  gap: 20px;
  background-image: url('/img/Sprinkle.svg');

  @media screen and (max-width: 900px) {
    padding: 20px 10px;
  }
`;

BilleteraDetailPage.propTypes = {
  authToken: PropTypes.string.isRequired,
  walletId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
  walletId: selectUserWalletId,
});

export default withAuth(connect(mapStateToProps, null)(BilleteraDetailPage), [
  roles.SUPER_ADMIN,
  roles.ADMIN,
  roles.REPARTIDOR,
  roles.VENDEDOR,
]);
