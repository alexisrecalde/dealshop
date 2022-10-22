import Head from 'next/head';
import styled from 'styled-components';

const AboutUsPage = () => {
  return (
    <Container>
      <Head>
        <title>Dealshop - Nosotros</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Nosotros Dealshop" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
      <Main>
        <Title>Sobre Nosotros</Title>
        <Text>
          DEALSHOP es una empresa dedicada a impulsar a las personas que forman parte del equipo a aumentar
          exponencialmente sus ingresos, poniendo a su disposición un amplio abanico de servicios que hacen mucho más
          ágil la actividad comercial en las plataformas e-commerce disponibles.
        </Text>
        <Text>
          Contamos con stock permanente de productos de alta demanda en páginas de venta online. Acompañamos a nuestros
          vendedores sin que los mismos pierdan su independencia laboral. Es un sistema simple e innovador para poder
          trabajar desde casa sin necesidad de inversión con importantes ganancias comprobadas.
        </Text>
        <Text>
          Este sistema de ventas surgió a partir del confinamiento de público conocimiento que llevo a la necesidad de
          cerrar las puertas de muchos comercios y empresas consideradas “No esenciales” y así dejar a muchas personas
          sin posibilidad de ingreso alguno.
        </Text>
        <Text>
          Hoy en día este sistema se posiciona como uno de los más eficientes a la hora de generar ingresos ya que una
          vez concretada la venta de forma instantánea el vendedor líder o sub-vendedor tiene a su disposición las
          ganancias en su billetera virtual que puede materializar o bien realizar compras online en nuestro e-commerce
          con costos más que convenientes.
        </Text>
        <Text>
          DEALSHOP es una empresa que desde que fue creada no paró de crecer, esto confirma la aceptación de los
          clientes a la hora de adquirir productos por internet.
        </Text>
        <Text>
          Te invitamos a que seas parte de la familia DEALSHOP, y así puedas multiplicar tus ingresos de manera
          exponencial con mínimo esfuerzo. Comprobalo registrándote en nuestra web{' '}
          <HyperLink href="/">www.dealshop.com.ar</HyperLink> ¡es ahora!, el futuro ya llegó.
        </Text>
        <Sign>
          <SignName>DEALSHOP S.A.</SignName>
          <SignText>Comunidad que crece!</SignText>
        </Sign>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  min-height: 50vh;
  padding: 30px 15%;
  background-image: url('/img/Sprinkle.svg');
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px 15%;
  background-color: #ffffff;
  text-align: center;
`;

const Title = styled.h2`
  color: #e91e63;
  font-size: 2rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
`;

const HyperLink = styled.a`
  color: #00bcd4;
`;

const Sign = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SignName = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  font-style: italic;
  margin-block-end: 0em;
`;

const SignText = styled.p`
  font-size: 1.4rem;
  margin-block-start: 0em;
`;

export default AboutUsPage;
