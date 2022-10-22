import { useRouter } from 'next/router';
import Link from 'next/link';

const PedidoRealizado = () => {
  const router = useRouter();
  const { nroPedido } = router.query;

  return (
    <div style={Styles.container} style={{ zIndex: 5}}>
      <h2 style={{ ...Styles.center, ...Styles.title }}>El pedido n° {nroPedido} se ha realizado con éxito</h2>
      <p style={{ ...Styles.center, ...Styles.text }}>
        Podrás ver los datos del mismos
        <br />
        ingresando a la sección de
        <br />
        <b>"Mis pedidos"</b> en el menú.
        <br />
        Recordá compartir el nro de
        <br />
        pedido con el cliente.
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

export default PedidoRealizado;
