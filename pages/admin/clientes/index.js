import React, { useState, useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectUserToken } from "../../../redux/user/user.selector";
import { getClientList } from "../../../queries/users/users.queries";
import { getAllPurchaseOfClient } from "../../../queries/users/users.queries";
import styled from "styled-components";
import ControlCardComponent from "../../../components/card/controlCard/controlCard.component";
import CountUp from "react-countup";

const MenuClientesPage = ({ authToken }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [listaDeCliente, setListaDeCliente] = useState([]);
  const [listaDeVentas, setListaDeVentas] = useState([]);

  const actions = [
    {
      id: 1,
      title: "Todos los clientes",
      image: (
        <img
          src="/img/icons/pedidos-menu_todos.png"
          style={{ height: "130px" }}
        />
      ),
      path: "/admin/clientes/clientes",
    },
    {
      id: 2,
      title: "Ventas directas",
      image: (
        <ActionIcon
          src="/img/icons/ventadirecta.png"
          alt="Admin - Ventas directas"
        />
      ),
      path: "/admin/clientes/ventasDirectas",
      // params: { clientStatusPaymentId: 1 },
    },
    {
      id: 3,
      title: "Envíos sin asignar",
      image: (
        <img
          src="/img/icons/pedidos-menu_envios.png"
          style={{ height: "120px" }}
        />
      ),
      path: "/admin/clientes/enviosVentas",
      // params: { deliveryTypeId: 1 },
    },
    // {
    //   id: 4,
    //   title: "Estadisticas",
    //   image: (
    //     <img
    //       src="/img/icons/pedidos-menu_mostrador.png"
    //       style={{ height: "120px" }}
    //     />
    //   ),
    //   path: "/admin/clientes/estadisticas",
    //   // params: { deliveryTypeId: 3 },
    // },
  ];

  useEffect(() => {
    const putClientList = async () => {
      try {
        const clientGetting = await getClientList(authToken);
        const getPurchaseAllClients = await getAllPurchaseOfClient(authToken);
        // const res = getPurchaseAllClients.items.filter((el) => {
        //   return el.clientStatusPaymentId == 1;
        // });
        if (clientGetting) {
          setListaDeCliente(clientGetting);
          setListaDeVentas(getPurchaseAllClients);
        }
      } catch (e) {
        throw e;
      }
    };

    putClientList();
  }, []);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Panel Clientes</title>
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
        <h2 style={{ color: "#e91e63" }}>Clientes</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div className="container-cant-clientes">
            <CountUp
              end={listaDeCliente.length}
              duration={1.5}
              className="count-up"
            />
            <span className="span-cant-clientes"> Cantidad Clientes</span>
          </div>
          <div className="container-cant-clientes">
            <CountUp
              end={listaDeVentas.length}
              duration={1.5}
              className="count-up"
            />
            <span className="span-cant-clientes"> Cantidad Ventas</span>
          </div>
        </div>

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
  background-image: url("/img/Sprinkle.svg");
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 38% 38%;
  grid-template-rows: 1fr 1fr;
  grid-gap: 40px;
  justify-content: center;
  position: relative;
  z-index: 99999 @media screen and (max-width: 900px) {
    grid-template-columns: 48% 48%;
    grid-template-rows: 1fr 1fr;
  }
`;

const ActionIcon = styled.img`
  max-height: 120px;
  filter: invert(1);

  @media screen and (max-width: 900px) {
    max-height: 75px;
  }
`;

MenuClientesPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(MenuClientesPage);
