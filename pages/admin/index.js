import Head from "next/head";
import { styled } from "@mui/material/styles";

import ControlCardComponent from "../../components/card/controlCard/controlCard.component";
import withAuth, { roles } from "../../utils/auth.utils";

const AdminPanelPage = () => {
  const actions = [
    {
      id: 11,
      title: "Administrar Clientes",
      image: (
        <ActionIconClient
          src="/img/icons/user.png"
          alt="Admin - Administrar Sub Vendedores"
        />
      ),
      path: "/admin/clientes",
    },
    {
      id: 1,
      title: "Pedidos",
      image: (
        <ActionIcon src="/img/icons/admin_pedidos.png" alt="Admin - Pedidos" />
      ),
      path: "/admin/menuPedidos",
    },
    {
      id: 2,
      title: "Estadísticas",
      image: (
        <ActionIcon
          src="/img/icons/admin_estadisticas.png"
          alt="Admin - Estadísticas"
        />
      ),
      path: "/admin/estadisticas",
    },
    {
      id: 3,
      title: "Asignar Orden",
      image: (
        <ActionIcon
          src="/img/icons/admin_asignar_orden.png"
          alt="Admin - Asignar orden"
        />
      ),
      path: "/admin/asignarOrdenes",
    },
    {
      id: 4,
      title: "Administrar Billeteras",
      image: (
        <ActionIcon
          src="/img/icons/admin_billeteras.png"
          alt="Admin - Administrar billeteras"
        />
      ),
      path: "/admin/billeteras",
    },
    {
      id: 5,
      title: "Procesar Devoluciones",
      image: (
        <ActionIcon
          src="/img/icons/admin_devoluciones.png"
          alt="Admin - Procesar devoluciones"
        />
      ),
      path: "/admin/devoluciones",
    },
    {
      id: 6,
      title: "Registar Usuario",
      image: (
        <ActionIcon
          src="/img/icons/admin_registrar.png"
          alt="Admin - Registar un nuevo usuario"
        />
      ),
      path: "/admin/registro",
    },
    {
      id: 7,
      title: "Administrar Proveedores",
      image: (
        <ActionIcon
          src="/img/icons/admin_proveedores.png"
          alt="Admin - Administrar Proveedores"
        />
      ),
      path: "/admin/proveedores",
    },
    {
      id: 8,
      title: "Envíos",
      image: (
        <ActionIcon
          src="/img/icons/admin_envios.png"
          alt="Admin - Envios"
          style={{ height: "130px" }}
        />
      ),
      path: "/admin/menuEnvios",
    },
    {
      id: 9,
      title: "Habilitar Usuarios",
      image: (
        <ActionIcon
          src="/img/icons/admin_habilitar.png"
          alt="Admin - Habilitar usuarios"
        />
      ),
      path: "/admin/habilitarUsuarios",
    },
    {
      id: 10,
      title: "Administrar Sub Vendedores",
      image: (
        <ActionIcon
          src="/img/icons/admin_subsellers.png"
          alt="Admin - Administrar Sub Vendedores"
        />
      ),
      path: "/admin/sub-vendedores",
    },
  ];

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Admin panel</title>
        <meta name="author" content="Dealshop" />
        <meta
          name="description"
          content="Panel de Administración"
          key="title"
        />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <div>
      {header()}
      <Container>
        <h2 style={{ color: "#e91e63" }}>Administración</h2>
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
  margin-bottom: 40px;
  background-image: url('img/Sprinkle.svg')
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  grid-gap: 1.33%;
  justify-content: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 48% 48%;
  }
`;

const ActionIcon = styled.img`
  max-height: 100px;
  filter: invert(1);

  @media screen and (max-width: 900px) {
    max-height: 75px;
  }
`;

const ActionIconClient = styled.img`
  max-height: 100px;

  @media screen and (max-width: 900px) {
    max-height: 75px;
  }
`;

export default withAuth(AdminPanelPage, [roles.SUPER_ADMIN, roles.ADMIN]);
