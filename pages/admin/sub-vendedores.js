import { useQuery } from 'react-query';
import Head from 'next/head';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { styled } from '@mui/material/styles';

import { selectUserToken } from '../../redux/user/user.selector';
import { getSellersList } from '../../queries/users/users.queries';

import withAuth, { roles } from '../../utils/auth.utils';
import Spinner from '../../components/spinner/spinner.component';
import ErrorComponent from '../../components/error/errorDefault.component';
import SubSellersTableComponent from '../../components/dataGrid/subsellersTable/subsellersTable.component';

const SubSellersPage = ({ authToken }) => {
    const { isLoading, isError, data } = useQuery(['listOfSellers', { authToken }], getSellersList);

    const header = () => {
        return (
            <Head>
                <title>Dealshop - Admin Sub Vendedores</title>
                <meta name="author" content="Dealshop" />
                <meta name="description" content="Admin Sub Vendedores" key="title" />
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
            <h2 style={{ color: '#e91e63' }}>Sub Vendedores</h2>
            <SubSellersTableComponent sellersList={data} authToken={authToken} />
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

SubSellersPage.propTypes = {
    authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
    authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(SubSellersPage), [roles.SUPER_ADMIN, roles.ADMIN]);
