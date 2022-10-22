import FormHelperText from "@mui/material/FormHelperText";

import { CartForm } from "../cartForm.styles";
import { InputText } from "../../../input/input.styles";

import DateInput from "../../../input/dateInput/dateInput.component";
import AddressInput from "../../../input/addressInput/addressInput.component";
import TextField from "@mui/material/TextField";
import { onInputLengthValidation } from "../../../../utils/general.utils";

const EnvioForm = ({ getValue, setValue }) => {
  const onChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value });
  };

  const onDayChange = (day) => {
    const date = new Date(day).toJSON();
    if (date != null && date.length > 10) {
      setValue({ ...getValue, fecha: date.slice(0, 10) });
    }
  };

  const getNextPickupDate = () => {
    let date = new Date();
    if (
      date.getHours() > 11 ||
      (date.getHours() === 11 && date.getMinutes() > 29)
    ) {
      date.setDate(date.getDate() + 1);
    }

    date.setHours(0, 0, 0, 0);
    return date;
  };

  return (
    <CartForm>
      <TextField
        id="outlined-name"
        // id="nombre-cliente"
        name="nombreCliente"
        label="Nombre del cliente"
        value={getValue.nombreCliente}
        onChange={onChange}
        inputProps={{ maxLength: 200 }}
        required
        fullWidth
        // placeholder ="Nombre del cliente"
        variant="standard"
        style={{ marginBottom: "20px" }}
      />
      <TextField
        id="dni"
        name="documentoCliente"
        value={getValue.documentoCliente}
        label="DNI"
        type="number"
        required={false}
        onInput={(e) => onInputLengthValidation(e, 20)}
        onChange={onChange}
        fullWidth
        variant="standard"
        style={{ marginBottom: "20px" }}
      />
      <TextField
        id="telefono"
        name="telefonoCliente"
        label="Teléfono"
        type="text"
        value={getValue.telefonoCliente}
        inputProps={{ maxLength: 20 }}
        onChange={onChange}
        required
        fullWidth
        variant="standard"
        style={{ marginBottom: "20px" }}
      />
      <DateInput
        id="fecha"
        label="Fecha de entrega"
        required={true}
        onChange={onDayChange}
        disabledDays={true}
        nextDateFunc={getNextPickupDate}
        style={{ marginBottom: "20px" }}
      />
      <AddressInput
        getValue={getValue}
        setValue={setValue}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
      <p
        style={{
          fontWeight: "bold",
          color: "#00bcd4",
          marginBlockStart: "0rem",
          marginBlockEnd: "0.3rem",
          fontSize: "1.2rem",
        }}
      >
        Costo de envío:{" "}
        {getValue.direccionEntrega != null
          ? getValue.envioId != 0
            ? `$ ${getValue.costoEnvio}`
            : "-"
          : "$ 0"}
      </p>
      <TextField
        id="notas"
        name="notas"
        label="Notas adicionales (Opcional)"
        inputProps={{ maxLength: 200 }}
        onChange={onChange}
        fullWidth
        variant="standard"
      />
      <FormHelperText>Ej: Casa con rejas blancas</FormHelperText>
    </CartForm>
  );
};

export default EnvioForm;
