import { useState } from 'react';
import Head from 'next/head';
import ResetPasswordForm from '../../../components/forms/signForm/resetPasswordForm/resetPasswordForm.component';

import Backdrop from '@mui/material/Backdrop';
import Spinner from '../../../components/spinner/spinner.component';

const Login = ({}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Dealshop - Login</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Login en Dealshop" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>

      <ResetPasswordForm setOpen={setOpen} />
      <Backdrop open={open} style={{ zIndex: '3000' }}>
        <Spinner />
      </Backdrop>
    </div>
  );
};

export default Login;
