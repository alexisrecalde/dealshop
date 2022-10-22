import Link from 'next/link';

const ErrorComponent = () => {
  return (
    <div style={{ minHeight: '50vh' }}>
      <h2 style={{ ...Styles.center, ...Styles.title }}>Página no encontrada!</h2>
      <p style={{ ...Styles.center, ...Styles.text }}>
        Parece que la página que estás buscando no existe.
        <br />
        <br />
        Por favor revisá la dirección e intentá nuevamente.
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
export default ErrorComponent;
