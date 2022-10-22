import Head from 'next/head';

import ErrorComponent from '../../components/error/errorDefault.component.jsx';

const ErrorDefaultPage = () => {
  return (
    <div style={Styles.container}>
      <Head>
        <title>Dealshop - Error inesperado</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Error - Ocurrió algo inesperado - Dealshop" key="title" />
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
export default ErrorDefaultPage;
