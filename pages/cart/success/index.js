import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { Dialog } from "primereact/dialog";
import {
  selectUsername,
  selectUserCompleteName,
  selectUserToken,
  selectUser,
  selectIsUserLogged,
} from "../../../redux/user/user.selector";
import sellOptions from "../../../components/utils/useSellingApi";
import Loader from "../../../components/loader";
import styled from "styled-components";
import { clearAllItemsFromCart } from "../../../redux/cart/cart.actions";

const SuccessPayment = ({ authToken, isUserLogged, clearAllItemsFromCart }) => {
  const router = useRouter();
  const query = router.query;
  const { postSellClientApprove } = sellOptions();
  const [infoPayment, setInfoPayment] = useState({
    order: query.order,
    statusOrder: query.status_order,
    preferenceId: query.preference_id,
    paymentId: query.payment_id,
    merchantOrderId: query.merchant_order_id,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const putClientList = async () => {
      setLoading(true);
      try {
        await postSellClientApprove(authToken, infoPayment);
        clearAllItemsFromCart();
        setLoading(false);
      } catch (e) {
        throw e
      }
    };

    putClientList();
  }, []);

  const goToHome = () => {
    router.push("/").then(() => window.scrollTo(0, 0));
  };

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
          {<Loader />}
        </div>
      </PageContainer>
    );
  }

  if (!loading) {
    return (
      <PageContainer>
        {header()}
        <Dialog
          className="dialog-finalizar-compra"
          visible={true}
          style={{ width: "500px" }}
        >
          <div className="container-felicitaciones">
            <img src="/img/check.png" alt="" />
            <div className="felicidades-pago">!Felicidades!</div>
            <div className="compra-realizada-con-exito">
              Compra realizada con éxito
            </div>
            <div className="div-felicidades-codigo-seguimiento">
              Tu código de seguimiento es: {infoPayment.paymentId}
            </div>
            {isUserLogged && (
              <div className="div-felicidades-visualizar">
                Podés visualizarlo en la ventana{" "}
                <span
                  onClick={() =>
                    router.push("/miscompras").then(() => window.scrollTo(0, 0))
                  }
                  style={{ color: "#33A0FF", cursor: "pointer" }}
                >
                  Mis compras
                </span>
              </div>
            )}
            <button
              className="button-inicio-sesion"
              onClick={() => {
                goToHome();
              }}
              style={{ width: "200px", borderRadius: "10px" }}
            >
              Ir a inicio
            </button>
          </div>
        </Dialog>
      </PageContainer>
    );
  }
};

const PageContainer = styled.div`
  padding: 20px 100px 40px 100px;
  display: flex;
  height: 50vh;
  justify-content: center;
  flex-direction: column;
`;

SuccessPayment.propTypes = {
  username: PropTypes.string.isRequired,
  userCompleteName: PropTypes.string.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
  signOut: PropTypes.func.isRequired,
  authToken: PropTypes.string,
  updateUserData: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: selectUsername,
  userCompleteName: selectUserCompleteName,
  authToken: selectUserToken,
  user: selectUser,
  isUserLogged: selectIsUserLogged,
});

const mapDispatchToProps = (dispatch) => ({
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPayment);
