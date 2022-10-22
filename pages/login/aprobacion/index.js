import Link from 'next/link';
import Head from 'next/head';

const EsperaAprobacion = () => {
  return (
    <div style={Styles.container}>
      <Head>
        <title>Dealshop - Espera aprobación</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Espera aprobación en Dealshop" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
      <h2 style={{ ...Styles.center, ...Styles.title }}>Su solicitud se ha realizado con éxito</h2>
      <p style={{ ...Styles.center, ...Styles.text }}>
        Estamos validando sus datos, en
        <br />
        las próximas horas recibirá
        <br />
        un mail de confirmación.
      </p>
      <div style={{ ...Styles.center, ...Styles.linksContainer }}>
        <Link href={'/'} passHref>
          <a style={{ ...Styles.text, ...Styles.link }}>Ir al Inicio</a>
        </Link>
        <Link href={'/'} passHref>
          <a style={Styles.logoContainer}>
            <img src="/img/logo_final.png" width={70} height={70} />
            <h2>DEALSHOP</h2>
          </a>
        </Link>
      </div>
    </div>
  );
};

const Styles = {
  container: {
    padding: '20px',
  },
  center: {
    textAlign: 'center',
  },
  title: {
    color: '#00bcd4',
    fontSize: '2rem',
  },
  text: {
    fontSize: '1.5rem',
  },
  link: {
    color: '#e91e63',
  },
  linksContainer: {
    width: '100%',
    display: 'inline-grid',
    gap: '20px',
  },
  logoContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '10px',
  },
};
export default EsperaAprobacion;
