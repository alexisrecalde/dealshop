import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { signInUser } from "../../../redux/user/user.actions";
import { TabView, TabPanel } from "primereact/tabview";
import FormNoLogeado from "../formNoLogeado";

const CartDomicilioRegister = ({ setShipping, shipping }) => {
  const router = useRouter();

  return (
    <>
      <TabView>
        <TabPanel header="Inicia Sesion">
          <Card className="card-domicilio card-inicio-no-login">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingBottom: "10px",
              }}
            >
              <h3>Ya tenes cuenta? </h3>
              <button
                className="button-inicio-sesion"
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </button>
            </div>
          </Card>
        </TabPanel>
        {/* <TabPanel header="Registro">
          <Card className="card-domicilio card-inicio-no-login">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingBottom: "10px",
              }}
            >
              <h3>Aun no tenes cuenta en Dealshop? </h3>
              <button
                className="button-inicio-sesion"
                onClick={() => router.push("/register")}
              >
                Registrate
              </button>
            </div>
          </Card>
        </TabPanel> */}
        {/* <TabPanel header="Comprar sin cuenta">
          <Card className="card-domicilio card-inicio-no-login">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingBottom: "10px",
              }}
            >
              <h3>
                Vamos a necesitar informacion para poder seguir con la compra
              </h3>
              <FormNoLogeado setShipping={setShipping} shipping={shipping} />
            </div>
          </Card>
        </TabPanel> */}
      </TabView>
    </>
  );
};

CartDomicilioRegister.propTypes = {
  signInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signInUser: (userData) => dispatch(signInUser(userData)),
});

export default connect(null, mapDispatchToProps)(CartDomicilioRegister);
