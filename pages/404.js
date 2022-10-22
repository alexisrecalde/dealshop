import Head from 'next/head';

import ErrorComponent from '../components/error/errorPageNotFound.component';

const ErrorPage = () => {
  return (
    <div style={Styles.container}>
      <Head>
        <title>Dealshop Argentina- Página no encontrada</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Error - Página no encontrada - Dealshop" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
      <ErrorComponent />
    </div>
  );
};

const Styles = {
  container: {
    padding: '20px',
  },
};
export default ErrorPage;
