import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectUserToken } from "../redux/user/user.selector";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getSeguimiento } from "../queries/purchase/purchase.queries";
import ModalSeguimiento from "../components/modalSeguimientoEnvio";

const SeguimientosEnvios = ({ authToken }) => {
  const [value1, setValue1] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardSeguimiento, setCardSeguimiento] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [status, setStatus] = useState("");

  const onChangeSeguimiento = (e) => {
    setValue1(e.target.value);
  };
  const buscarSeguimientoEnvio = async () => {
    if (value1 != "") {
      setCardSeguimiento(true);
      try {
        setLoading(true);
        const seguimientoSta = await getSeguimiento(value1, authToken);
        if (seguimientoSta.clientStatusOrderId) {
          setStatus(seguimientoSta.clientStatusOrderId);
          setOrdenCompra(seguimientoSta)
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setStatus(false);
          setLoading(false);
          setNotFound(true);
        }
      } catch (e) {
        setStatus(false);
        setLoading(false);
        setNotFound(true);
      }
    } else {
      return;
    }
  };

  return (
    <div className="container-seguimiento-envios">
      <Card className="card-seguimiento-envios" style={{ margin: "0 auto" }}>
        <div className="field col-12">
          <label htmlFor="withoutgrouping">Buscar estado de mi envio</label>
          <InputText
            inputId="withoutgrouping"
            value={value1}
            onChange={onChangeSeguimiento}
            mode="decimal"
            useGrouping={false}
            style={{ width: "100%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0px auto",
              marginTop: "10px",
            }}
          >
            <Button
              className="button-slide sign-in-button"
              onClick={buscarSeguimientoEnvio}
            >
              Buscar Envio
            </Button>
          </div>
        </div>
      </Card>
      {/* {cardSeguimiento && ( */}
        <ModalSeguimiento
          cardSeguimiento={cardSeguimiento}
          setCardSeguimiento={setCardSeguimiento}
          ordenCompra={ordenCompra}
          loading={loading}
          status={status}
        />
      {/* )} */}
    </div>
  );
};

SeguimientosEnvios.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(SeguimientosEnvios);
