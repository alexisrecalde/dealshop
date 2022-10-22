import { useState } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Backdrop from '@mui/material/Backdrop';

import withAuth, { roles } from '../../../utils/auth.utils';
import { selectUserToken } from '../../../redux/user/user.selector';
import { getWalletById } from '../../../queries/wallet/wallet.queries';

import Spinner from '../../../components/spinner/spinner.component';
import ErrorComponent from '../../../components/error/errorDefault.component';
import WalletDetailTableComponent from '../../../components/dataGrid/walletTable/walletDetailTable.component';
import WalletCardComponent from '../../../components/card/walletCard/walletCard.component';

const BilleteraDetailPage = ({ authToken }) => {
  const router = useRouter();
  const { walletId } = router.query;

  const [open, setOpen] = useState(false);

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
        <h2 style={{ color: '#e91e63', marginBlockEnd: '1rem' }}>
          Billetera de {data.user.firstName + ' ' + data.user.lastName + ' [' + data.user.dni + ']'}
        </h2>
        <WalletCardComponent
          isAdmin={true}
          walletId={walletId}
          balance={data.balance}
          authToken={authToken}
          style={{ marginBlockEnd: '1rem' }}
        />
        <WalletDetailTableComponent
          authToken={authToken}
          balance={data.balance}
          movements={data.movements}
          isAdmin={true}
          setOpen={setOpen}
        />
      </Container>
      <Backdrop open={open} style={{ zIndex: '3000' }}>
        <Spinner />
      </Backdrop>
    </div>
  );
};

const Container = styled.div`
  padding: 30px 100px;
  display: flex;
  flex-direction: column;
  min-height: 45vh;

  @media screen and (max-width: 900px) {
    padding: 20px 10px;
  }
`;

BilleteraDetailPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(BilleteraDetailPage), [roles.SUPER_ADMIN, roles.ADMIN]);
