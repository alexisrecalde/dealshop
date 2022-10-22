import Head from 'next/head';
import { styled } from '@mui/material/styles';

import ControlCardComponent from '../../components/card/controlCard/controlCard.component';
import withAuth, { roles } from '../../utils/auth.utils';

import { FaTruckLoading } from 'react-icons/fa';

const AdminPanelPage = () => {
  const actions = [
    {
      id: 1,
      title: 'Envíos asignados',
      image: <img src="/img/icons/pedidos-menu_envios.png" style={{ height: '120px' }} />,
      path: '/envios',
    },
    {
      id: 2,
      title: 'Envíos sin asignar',
      image: <FaTruckLoading style={{ fontSize: '100px', height: '120px', filter: 'invert(1)' }} />,
      path: '/envios/sinAsignar',
    },
  ];

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Admin panel</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Panel de Administración" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <div>
      {header()}
      <Container>
        <h2 style={{ color: '#e91e63' }}>Envíos</h2>
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
  min-height: 60vh;
  background-image: url('/img/Sprinkle.svg');
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 38% 38%;
  grid-gap: 50px;
  justify-content: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 48% 48%;
    grid-gap: 20px;
  }
`;

export default withAuth(AdminPanelPage, [roles.SUPER_ADMIN, roles.ADMIN]);
