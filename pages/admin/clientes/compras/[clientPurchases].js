import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Head from "next/head";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectUserToken } from "../../../../redux/user/user.selector";
import getPurchaseInfo from "../../../../components/utils/getPurchaseApi";
import ComprasTable from "../../../../components/dataGrid/comprasTable";
import Spinner from "../../../../components/spinner/spinner.component";

const ClientPurchasesPage = ({ authToken }) => {
  const router = useRouter();
  const clientPurchases = router.query;
  const [loading, setLoading] = useState(false);
  const { getMyPurchaseOfClient } = getPurchaseInfo();
  const [arrayCompras, setArrayCompras] = useState([]);

  useEffect(() => {
    const getClientCompras = async () => {
      setLoading(true);
      try {
        const getPurchases = await getMyPurchaseOfClient(
          clientPurchases.clientPurchases,
          authToken
        );
        setArrayCompras(getPurchases);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        throw error;
      }
    };
    getClientCompras();
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
          <Spinner />
        </div>
      </PageContainer>
    );
  }

  if (!loading) {
    return (
      <PageContainer>
        {header()}
        <h2 style={{ color: "#e91e63" }}>Compras del cliente: </h2>
        <ComprasTable arrayCompras={arrayCompras} />
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

ClientPurchasesPage.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(ClientPurchasesPage);
