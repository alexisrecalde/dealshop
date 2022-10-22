import { useState } from 'react';
import Head from 'next/head';
import Backdrop from '@mui/material/Backdrop';

import RecoverUserForm from '../../../components/forms/signForm/recoverUserForm/recoverUserForm.component';
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

      <RecoverUserForm setOpen={setOpen} />
      <Backdrop open={open} style={{ zIndex: '3000' }}>
        <Spinner />
      </Backdrop>
    </div>
  );
};

export default Login;
