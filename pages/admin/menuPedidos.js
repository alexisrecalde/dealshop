import Head from 'next/head';
import { styled } from '@mui/material/styles';

import withAuth, { roles } from '../../utils/auth.utils';
import ControlCardComponent from '../../components/card/controlCard/controlCard.component';

const MenuPedidosPage = () => {
  const actions = [
    {
      id: 1,
      title: 'Todos los pedidos',
      image: <img src="/img/icons/pedidos-menu_todos.png" style={{ height: '130px' }} />,
      path: '/admin/pedidos',
    },
    {
      id: 2,
      title: 'Retiro por sucursal',
      image: <img src="/img/icons/pedidos-menu_deposito.png" style={{ height: '120px' }} />,
      path: '/admin/pedidos', 
      params: { deliveryTypeId: 2 },
    },
    {
      id: 3,
      title: 'Envíos a domicilio',
      image: <img src="/img/icons/pedidos-menu_envios.png" style={{ height: '120px' }} />,
      path: '/admin/pedidos',
      params: { deliveryTypeId: 1 },
    },
    {
      id: 4,
      title: 'Ventas por mostrador',
      image: <img src="/img/icons/pedidos-menu_mostrador.png" style={{ height: '120px' }} />,
      path: '/admin/pedidos',
      params: { deliveryTypeId: 3 },
    },
  ];

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Panel pedidos</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Panel de Pedidos" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <div>
      {header()}
      <Container>
        <h2 style={{ color: '#e91e63' }}>Pedidos</h2>
        <CardContainer>
          {actions.map((action) => (
            <ControlCardComponent key={action.id} action={action} />
          ))}
        </CardContainer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding: 20px;
  background-image: url('/img/Sprinkle.svg');
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 38% 38%;
  grid-template-rows: 1fr 1fr;
  grid-gap: 40px;
  justify-content: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 48% 48%;
    grid-template-rows: 1fr 1fr;
  }
`;

const ActionIcon = styled.img`
  max-height: 120px;
  filter: invert(1);

  @media screen and (max-width: 900px) {
    max-height: 90px;
  }
`;

export default withAuth(MenuPedidosPage, [roles.SUPER_ADMIN, roles.ADMIN]);
