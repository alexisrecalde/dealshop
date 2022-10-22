import { useState } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';

import withAuth, { roles } from '../../utils/auth.utils';
import { selectUserToken } from '../../redux/user/user.selector';
import { getProviders } from '../../queries/providers/providers.queries';

import Spinner from '../../components/spinner/spinner.component';
import ErrorComponent from '../../components/error/errorDefault.component';
import ProvidersTableComponent from '../../components/dataGrid/providersTable/providersTable.component.jsx';

const ProvidersPage = ({ authToken }) => {
  const [open, setOpen] = useState(false);
  const { isLoading, isError, data } = useQuery(['providers'], getProviders);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Proveedores</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Admin - Proveedores" key="title" />
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
      <h2 style={{ color: '#e91e63', marginBlockEnd: '0rem' }}>Proveedores</h2>
      <ProvidersTableComponent authToken={authToken} providers={data} setOpen={setOpen} />
      <Backdrop open={open} style={{ zIndex: '3000' }}>
        <Spinner />
      </Backdrop>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 20px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 60vh;
  background-image: url('/img/Sprinkle.svg');
`;

ProvidersPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(ProvidersPage), [roles.SUPER_ADMIN, roles.ADMIN]);
