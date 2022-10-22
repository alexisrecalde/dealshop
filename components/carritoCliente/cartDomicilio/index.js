import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { Card } from "primereact/card";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  selectUserToken,
  selectUserId,
  selectUserCompleteName,
  selectUserPhone,
} from "../../../redux/user/user.selector";
import getAddress from "../../utils/getAddress";
import { signOutUser, updateUserData } from "../../../redux/user/user.actions";
import { getClientInfo } from "../../../queries/users/users.queries";
import { getShippingData } from "../../../queries/cart/cart.queries";
import { deliveryVehicle } from "../../../utils/constants.utils";
import { getLatLngByZipcode } from "../../utils/getLatLon";

const CartDomicilio = ({
  authToken,
  userCompleteName,
  phone,
  setDomicilio,
  domicilio,
  setNoAddressFound,
  noAddressFound,
  isTruckDelivery,
  setShipping,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAddressCart = async () => {
      setLoading(true);
      try {
        const data = await getClientInfo(authToken);
        if (data.ClientAdress.length > 0) {
          setDomicilio({
            street: data.ClientAdress[0].street,
            streetHeigth: data.ClientAdress[0].streetHeigth,
            postalCode: data.ClientAdress[0].postalCode,
            province: data.ClientAdress[0].province,
            address: data.ClientAdress[0].address,
            departamentNumber: data.ClientAdress[0].departamentNumber,
          });

          const address = `${data.ClientAdress[0].street} ${data.ClientAdress[0].streetHeigth}, ${data.ClientAdress[0].address}, ${data.ClientAdress[0].province}`;
          const postal = `${data.ClientAdress[0].postalCode}`;
          getLatLngByZipcode(
            authToken,
            address,
            postal,
            setShipping,
            isTruckDelivery
          );
        } else {
          setNoAddressFound(true);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (e.response.status) {
          setNoAddressFound(true);
        }
      }
    };
    getAddressCart();
  }, []);

  return (
    <>
      <Card className="card-domicilio">
        {loading && (
          <ProgressSpinner
            style={{ width: "50px", height: "50px", color: "red" }}
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
          />
        )}
        {!loading &&
          (noAddressFound ? (
            <div>
              No encontramos direccion de entrega, puedes agregarlo desde tu{" "}
              <Link href="/perfil" passHref>
                <a
                  style={{
                    fontSize: "1.4rem",
                    color: "#006C84",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Perfil
                </a>
              </Link>
            </div>
          ) : (
            <>
              <div>
                <i
                  className="pi pi-map-marker p-text-secondary p-overlay-badge"
                  style={{
                    fontSize: "2rem",
                    color: "#696969",
                    cursor: "pointer",
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                ></i>
              </div>
              <div style={{ marginRight: "auto", marginLeft: "20px" }}>
                <h2 className="item-card-domicilio-calle">
                  {domicilio.street.toLowerCase()} {domicilio.streetHeigth}
                </h2>
                <div className="item-card-domicilio-cart">
                  C.P. {domicilio.postalCode} - {domicilio.address},{" "}
                  {domicilio.province}{" "}
                  {domicilio.departamentNumber != "" &&
                    `- Departamento:
                ${domicilio.departamentNumber.toUpperCase()}`}
                </div>
                <div className="item-card-domicilio-cart">
                  {userCompleteName.toLowerCase()}- {phone}
                </div>
              </div>
              <div
                className="editar-card-domicilio"
                onClick={() =>
                  router.push("/perfil").then(() => window.scrollTo(0, 0))
                }
              >
                Editar
              </div>
            </>
          ))}
      </Card>
    </>
  );
};

CartDomicilio.propTypes = {
  userId: PropTypes.number.isRequired,
  authToken: PropTypes.string,
  userCompleteName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  authToken: selectUserToken,
  userCompleteName: selectUserCompleteName,
  phone: selectUserPhone,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
  updateUserData: (data) => dispatch(updateUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDomicilio);
