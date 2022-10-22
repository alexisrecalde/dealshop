import React, { useState, useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import { selectUserToken } from "../../../redux/user/user.selector";
import { getClientList } from "../../../queries/users/users.queries";
import ClienteTableComponent from "../../../components/dataGrid/clientesTable/index";
import Spinner from "../../../components/spinner/spinner.component";

const Clientes = ({ authToken }) => {
  const [loading, setLoading] = useState(false);
  const [listaDeCliente, setListaDeCliente] = useState([]);

  useEffect(() => {
    setLoading(true);
    const putClientList = async () => {
        setLoading(true);
        try {
          const clientGetting = await getClientList(authToken);
          if (clientGetting) {
            setListaDeCliente(clientGetting);
            setLoading(false);
          }
        } catch (e) {
         throw e
        }
    };

    putClientList();
  }, []);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Admin Clientes</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Admin Sub Vendedores" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  if (loading) {
    return (
      <PageContainer>
        {header()}
        <div className="" style={{ margin: "20px auto" }}>
          <Spinner/>
        </div>
      </PageContainer>
    );
  }

  if (!loading) {
    return (
      <PageContainer>
        {header()}
        <h2 style={{ color: "#e91e63" }}>Clientes</h2>
        <ClienteTableComponent listaDeCliente={listaDeCliente} />
      </PageContainer>
    );
  }
};

const PageContainer = styled.div`
  padding: 20px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

Clientes.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(Clientes);