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
import CompraByOneAdm from "../../../../components/compraByOneAdm";
import { getPurchase } from "../../../../queries/orders/orders.queries";

const ClientPurchaseId = ({ authToken }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const comprasId = router.query;

  const {
    getMyPurchaseDetailByOne,
    getMyPurchaseByOne,
    getPurchaseClientInfo,
  } = getPurchaseInfo();
  const [compra, setCompra] = useState([]);
  const [compraInfo, setCompraInfo] = useState({});
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getClientCompras = async () => {
      try {
        const getPurchaseInfo = await getPurchaseClientInfo(
          comprasId.comprasId,
          authToken
        );
        if (getPurchaseInfo) {
          const getPurchaseByone = await getMyPurchaseByOne(
            comprasId.comprasId,
            authToken
          );
          const getPurchaseProduct = await getMyPurchaseDetailByOne(
            comprasId.comprasId,
            authToken
          );
          setProductos(getPurchaseProduct);
          setCompra(getPurchaseByone[0]);
          setCompraInfo(getPurchaseInfo);
          setLoading(false);
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(true);
        console.log(error)
      }
    };
    getClientCompras();
  }, []);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Compra </title>
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
        {/* <h2 style={{ color: "#e91e63" }}>Detalle de venta de directa </h2> */}
        <CompraByOneAdm compra={compra} compraInfo={compraInfo}  productos={productos}/>
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

ClientPurchaseId.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(ClientPurchaseId);
