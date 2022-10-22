import { useState } from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Backdrop from '@mui/material/Backdrop';

import withAuth, { roles } from '../../utils/auth.utils';
import RegisterForm from '../../components/forms/formsAdm/registerForm/registerForm.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectUserEmail } from '../../redux/user/user.selector';

const AdminRegistroPage = ({ userEmail }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Head>
        <title>Dealshop - Admin Registro</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Registro de usuarios en Dealshop" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
      <SignContainer>
        <RegisterForm isAdminPage={true} userEmail={userEmail} setOpen={setOpen} />
      </SignContainer>
      <Backdrop open={open} style={{ zIndex: '3000' }}>
        <Spinner />
      </Backdrop>
    </div>
  );
};

const SignContainer = styled.div`
  display: flex;
  padding: 0px 15%;
  background-image: url('/img/Sprinkle.svg');

  @media screen and (max-width: 900px) {
    padding: 0px 10px;
  }
`;

AdminRegistroPage.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userEmail: selectUserEmail,
});

export default withAuth(connect(mapStateToProps, null)(AdminRegistroPage), [roles.SUPER_ADMIN, roles.ADMIN]);
