import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import withAuth, { roles } from "../../../utils/auth.utils";
import { createStructuredSelector } from "reselect";
import { getWalletById } from "../../../queries/wallet/wallet.queries";
import {
  selectUserToken,
  selectUserWalletId,
} from "../../../redux/user/user.selector";
import { CurrencyText } from "../../../utils/number.utils";

const UserLoged = ({ authToken, walletId }) => {
  const { data } = useQuery(["productId", walletId], () =>
    getWalletById(walletId, authToken)
  );
  const [balanceUser, setUserBalance] = useState("");
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  useEffect(() => {
    const getBalance = () => {
      if (data) {
        setUserBalance(data.balance);
      }
    };
    getBalance();
  }, [data]);

  return (
    <div style={{ position: "relative" }} className="billetera-gui">
      {!mobileView ? (
        <span
          style={{ margin: "0 10px" }}
          data-pr-position="bottom"
          tooltipOptions={{ position: "bottom" }}
        >
          Billetera
        </span>
      ) : null}

      <span>
        {" "}
        <CurrencyText value={balanceUser} />
      </span>
    </div>
  );
};

UserLoged.propTypes = {
  authToken: PropTypes.string,
  walletId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
  walletId: selectUserWalletId,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
});

export default withAuth(
  connect(mapStateToProps, mapDispatchToProps)(UserLoged),
  [roles.SUPER_ADMIN, roles.ADMIN, roles.REPARTIDOR, roles.VENDEDOR]
);
