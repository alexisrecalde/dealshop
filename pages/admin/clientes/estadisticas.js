import React, { useState, useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectUserToken } from "../../../redux/user/user.selector";
import {
  getAllPurchaseOfClient,
  getClientList,
} from "../../../queries/users/users.queries";
import WidgetLastPurchases from "../../../components/widgets/widgetLastPurchases";
import WidgetLastClients from "../../../components/widgets/widgetLastClients";

const Estadisticas = ({ authToken }) => {
  // const [listaDeCliente, setListaDeCliente] = useState([]);
  // const [listaDeComprasClientes, setListaDeComprasClientes] = useState([]);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const putClientList = async () => {
  //     try {
  //       const clientGetting = await getClientList(authToken);
  //       const getPurchaseAllClients = await getAllPurchaseOfClient(authToken);
  //       if (clientGetting) {
  //         setListaDeCliente(clientGetting);
  //         setListaDeComprasClientes(getPurchaseAllClients);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   putClientList();
  // }, []);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Panel Estadisticas</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Panel de Pedidos" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <>
      {header()}
      <div className="container-back-image" style={{ minHeight: "60vh" }}>
        <h2 style={{ color: "#e91e63" }}>Estadisticas</h2>
        {/* <div
          // className="container-estadisticas"
          style={{
            display: "grid",
            gridTemplateColumns: "32% auto",
            gridGap: "20px",
            zIndex: "10",
          }}
        >
          <div style={{ zIndex: 10 }}>
            <WidgetLastClients listaDeCliente={listaDeCliente} />
          </div>
          <div
            className="card flex justify-content-center"
            style={{ flexDirection: "column", zIndex: 10 }}
          >
            <WidgetLastPurchases
              listaDeComprasClientes={listaDeComprasClientes}
            />
          </div>
        </div>
        <div
          // className="container-estadisticas"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 40%",
            gridGap: "20px",
            zIndex: "10",
            marginTop: "20px",
          }}
        >
          <div style={{ zIndex: 10 }}>
            <WidgetLastClients listaDeCliente={listaDeCliente} />
          </div>
        </div> */}
      </div>
    </>
  );
};

Estadisticas.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(Estadisticas);

// export default Estadisticas;

{
  /* <Card style={{ zIndex: 10 }}>
              <h2 style={{ color: "#e91e63", fontSize: "18px", zIndex: 10 }}>
                Productos destacados
              </h2>
              <Chart
                type="pie"
                data={chartData}
                options={lightOptions}
                style={{
                  position: "relative",
                  width: "300px",
                  margin: "0 auto",
                }}
              />
            </Card> */
}
