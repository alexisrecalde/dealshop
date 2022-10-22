import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import { FormRadioInput } from "./cartForm.styles";
import RetiroForm from "./retiroForm/retiroForm.component";
import EnvioForm from "./envioForm/envioForm.component";
import MostradorForm from "./mostradorForm/mostradorForm.component";
import {
  selectIsUserAdmin,
  selectUserToken,
} from "../../../redux/user/user.selector";
import { updateDeliveryType } from "../../../redux/shopData/shopData.actions";

const CartForm = ({ getValue, setValue, isUserAdmin, authToken }) => {
  const dispatch = useDispatch();
  const [getTipoDeEntrega, setTipoDeEntrega] = useState("RETIRO_POR_SUCURSAL");

  const renderSwitch = (param) => {
    switch (param) {
      case "RETIRO_POR_SUCURSAL":
        return <RetiroForm getValue={getValue} setValue={setValue} />;
      case "ENVIO_A_DOMICILIO":
        return <EnvioForm getValue={getValue} setValue={setValue} />;
      case "VENTA_POR_MOSTRADOR":
        return (
          <MostradorForm
            getValue={getValue}
            setValue={setValue}
            authToken={authToken}
          />
        );
    }
  };

  const onChangeEntrega = (event) => {
    const selectedType = event.target.value;
    dispatch(updateDeliveryType(selectedType));
    setTipoDeEntrega(selectedType);
    setValue({ ...getValue, tipoDeEntrega: selectedType });
  };

  return (
    <div>
      <RadioGroup
        aria-label="tipoDeEntrega"
        name="tipoDeEntrega"
        value={getTipoDeEntrega}
        onChange={onChangeEntrega}
      >
        <FormRadioInput
          value="RETIRO_POR_SUCURSAL"
          control={<Radio />}
          label="Retiro por sucursal"
        />
        <FormRadioInput
          value="ENVIO_A_DOMICILIO"
          control={<Radio />}
          label="Envío a domicilio"
        />
        {isUserAdmin && (
          <FormRadioInput
            value="VENTA_POR_MOSTRADOR"
            control={<Radio />}
            label="Venta por mostrador"
          />
        )}
      </RadioGroup>
      {renderSwitch(getTipoDeEntrega)}
    </div>
  );
};

CartForm.propTypes = {
  isUserAdmin: PropTypes.bool.isRequired,
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isUserAdmin: selectIsUserAdmin,
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(CartForm);