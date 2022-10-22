import Head from 'next/head';
import styled from 'styled-components';

const FAQsPage = () => {
  return (
    <Container>
      <Head>
        <title>Dealshop - Preguntas frecuentes</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Preguntas frecuentes Dealshop" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
      <Main>
        <Title>Preguntas frecuentes</Title>
        <SemiTitle>¿CÓMO FUNCIONA EL SISTEMA DEALSHOP?</SemiTitle>
        <Text>
          El sistema DEALSHOP funciona de la siguiente manera: El sistema DEALSHOP no requiere de inversión alguna por
          parte de los usuarios registrados como vendedores o sub-vendedores. Les proporcionamos dos listas de precios a
          todos los vendedores líderes, una de ellas con el precio de costo de los productos a publicar. La otra lista
          proporciona el precio sugerido con los que recomendamos se publiquen los productos ofrecidos por DEALSHOP. Una
          vez realizada la venta se cargan en <HyperLink href="www.dealshop.com.ar">www.dealshop.com.ar</HyperLink>{' '}
          (previamente deben registrarse para poder acceder al servicio), Luego de cargar el/los pedido(s) demorarán
          entre 24 y 48 horas en ser entregados. En el 90% de los casos son entregados en 24 horas. Luego de efectivizar
          dicha venta en el módulo “mis pedidos” pueden chequear si el/los mismo(s) fue o fueron entregado(s) con éxito
          y por consiguiente en el módulo “billetera virtual” podrán ver reflejadas las ganancias correspondientes.
        </Text>
        <SemiTitle>¿CÓMO SÉ SI HAY STOCK DE LO QUE ESTOY PUBLICANDO?</SemiTitle>
        <Text>
          El stock real de productos figura en el feed (inicio) de la web ingresando con contraseña en{' '}
          <HyperLink href="www.dealshop.com.ar">www.dealshop.com.ar</HyperLink>
        </Text>
        <SemiTitle>DESCRIPCIÓN DE PRODUCTOS</SemiTitle>
        <Text>
          Cada producto publicado en <HyperLink href="www.dealshop.com.ar">www.dealshop.com.ar</HyperLink> cuenta con
          foto y descripción que pueden ser descargadas por el usuario.
        </Text>
        <SemiTitle>¿CUÁNTO DEMORAN EN ENTREGAR LOS PEDIDOS?</SemiTitle>
        <Text>
          Los pedidos ingresados en sistema demorarán en ser entregados entre 24 y 48 horas dependiendo del stock y de
          la distancia de donde deba ser realizada la entrega.
        </Text>
        <SemiTitle>¿CUÁLES SON LOS COSTOS DE LOS ENVIOS?</SemiTitle>
        <Text>
          Los costos de los envíos pueden ser calculados en la tabla de envíos que figura en{' '}
          <HyperLink href="www.dealshop.com.ar">www.dealshop.com.ar</HyperLink>
        </Text>
        <SemiTitle>¿TENGO QUE ESTAR REGISTRADO EN AFIP PARA PODER SER VENDEDOR?</SemiTitle>
        <Text>
          Sí. Deben estar registrados como monotributistas en la categoría más alta (o según corresponda dependiendo del
          nivel de ventas de cada vendedor).
        </Text>
        <SemiTitle>¿CUANDO COBRO MIS GANACIAS?</SemiTitle>
        <Text>
          Las ganancias se hacen efectivas una vez entregados y cobrados todos los pedidos hasta el día jueves de cada
          semana. Las cuales son abonadas los días viernes de cada semana.
        </Text>
        <SemiTitle>¿PUEDO INVERTIR EN DEALSHOP?</SemiTitle>
        <Text>
          DEALSHOP te da la posibilidad de que ingreses productos que no estén en el catálogo de productos ofrecidos,
          obteniendo así ganancia sobre los mismos. Ver punto 6.8 de los términos y condiciones en{' '}
          <HyperLink href="www.dealshop.com.ar">www.dealshop.com.ar</HyperLink>
        </Text>
        <SemiTitle>¿CUÁNTO DEMORAN EN DESPACHAR LOS ENVIOS AL INTERIOR?</SemiTitle>
        <Text>
          Los envíos al interior serán despachados en 72 hrs (aprox.) Después de haber sido cargados en{' '}
          <HyperLink href="www.dealshop.com.ar">www.dealshop.com.ar</HyperLink>
        </Text>
        <SemiTitle>¿SE CAMBIA LA MERCADERÍA EN CASO QUE HAYA ALGUNA FALLA?</SemiTitle>
        <Text>
          Sí. Previo a realizar el cambio deben solicitar fotos y videos en donde se pueda ver la falla del artículo que
          se haya entregado, en caso de no tener evidencia de la falla el cambio NO puede ser realizado. Una vez
          constatada dicha falla o faltante se realizará el cambio en 48/72 hrs.
        </Text>
        <SemiTitle>¿QUÉ PASA SI EL CLIENTE NO RECIBE LA MERCADERIA POR FACTORES AJENOS A LA MISMA? (EJ. NO LE GUSTÓ, NO ERA LO QUE ESPERABA, ETC)</SemiTitle>
        <Text>En ese caso deberá abonar los gastos de envío. En caso que no quiera abonarlo deberá pagarlo el vendedor que haya cargado el pedido en el sistema. (sin excepción)</Text>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  min-height: 50vh;
  padding: 30px 15%;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px 15%;
  background-color: #ffffff;
`;

const Title = styled.h2`
  color: #e91e63;
  font-size: 2rem;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1rem;
  margin-block-start: 0.2em;
`;

const HyperLink = styled.a`
  color: #00bcd4;
`;

const SemiTitle = styled.h4`
  font-size: 1.1rem;
  margin-block-end: 0em;
`;

export default FAQsPage;
