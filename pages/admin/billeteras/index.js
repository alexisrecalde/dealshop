import { useState } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import withAuth, { roles } from '../../../utils/auth.utils';
import { selectUserToken } from '../../../redux/user/user.selector';
import { getUsers } from '../../../queries/users/users.queries';

import Spinner from '../../../components/spinner/spinner.component';
import ErrorComponent from '../../../components/error/errorDefault.component';
import WalletFilter from '../../../components/filters/wallterFilter/walletFilter.component';
import SellersWalletTableComponent from '../../../components/dataGrid/walletTable/sellersTable.component';

const AdminBilleterasPage = ({ authToken }) => {
  const [getName, setName] = useState('');

  const { isLoading, isError, data } = useQuery(['users', { authToken }], getUsers);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Admin Billeteras</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Administración de billeteras en Dealshop" key="title" />
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
        <h2 style={{ color: '#e91e63', marginBlockEnd: '0' }}>Administrar Billeteras</h2>
        <WalletFilter getName={getName} setName={setName} />
        <SellersWalletTableComponent name={getName} sellers={data.results} />
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
    padding: 20px 40px;
  }
`;

AdminBilleterasPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(AdminBilleterasPage), [roles.SUPER_ADMIN, roles.ADMIN]);
