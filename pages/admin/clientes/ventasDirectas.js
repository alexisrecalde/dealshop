import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import { selectUserToken } from "../../../redux/user/user.selector";
import {
  getAllCadets,
  getAllPurchaseOfClient,
} from "../../../queries/users/users.queries";
import ClienteTableComponent from "../../../components/dataGrid/clientesTable/index";
import Spinner from "../../../components/spinner/spinner.component";
import VentaDirectaTable from "../../../components/dataGrid/ventaDirectaTable";
import { getPurchase } from "../../../queries/orders/orders.queries";

const Clientes = ({ authToken }) => {
  const [cadets, setCadets] = useState([]);

  useEffect(() => {
    const putClientPurchaseAll = async () => {
      try {
        const retrievedCadets = await getAllCadets(authToken);
        if (retrievedCadets) {
          setCadets(retrievedCadets);
        }
      } catch (e) {
        throw e
      }
    };

    putClientPurchaseAll();
  }, []);

  const getVentas = async () => {
    const datos = await getAllPurchaseOfClient(authToken);
    return datos;
  };

  const { isLoading, data, isError } = useQuery(["ventas"], getVentas, {
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 2000,
  });

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Admin Clientes</title>
        <meta name="author" content="Owl Consulting" />
        <meta name="description" content="Admin Sub Vendedores" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <PageContainer>
      {header()}
      <h2 style={{ color: "#e91e63" }}>Ventas directas de clientes</h2>
      <VentaDirectaTable
        listaDeVentas={data}
        cadets={cadets}
        authToken={authToken}
        isLoading={isLoading}
        isError={isError}
      />
    </PageContainer>
  );
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
