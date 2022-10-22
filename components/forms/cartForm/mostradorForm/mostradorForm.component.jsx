import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { CartForm } from "../cartForm.styles";
import { InputContainer, InputText } from "../../../input/input.styles";
import { getAllSellers } from "../../../../queries/users/users.queries";

const MostradorForm = ({ getValue, setValue, authToken }) => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const retrieveAllSellers = async () => {
      const retrievedSellers = await getAllSellers(authToken);
      const data = [
        ...retrievedSellers,
        { id: null, firstName: "Sin asignar", lastName: "" },
      ];

      const dataAl = data.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );

      setSellers(dataAl);
    };

    const date = new Date().toJSON().slice(0, 10);
    setValue({ ...getValue, fecha: date });

    retrieveAllSellers();
  }, []);

  const onChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value });
  };

  const onTagsChange = (event, values) => {
    if (values == null) return;
    setValue({ ...getValue, idVendedor: values.id });
  };

  const onChangeSeller = (e) => {
    const value = e.target.value === 0 ? null : e.target.value;
    setValue({ ...getValue, [e.target.name]: value });
  };

  const onInputLengthValidation = (e, length) => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, length);
  };

  return (
    <CartForm>
      <TextField
        id="nombre-cliente"
        name="nombreCliente"
        label="Nombre del cliente"
        onChange={onChange}
        inputProps={{ maxLength: 200 }}
        value={getValue.nombreCliente}
        required
        fullWidth
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
      <InputContainer
        label="Vendedor"
        style={{ marginBottom: "10px" }}
        required
        fullWidth
        variant="standard"
      >
        <Stack spacing={2} fullWidth>
          <Autocomplete
            freeSolo
            options={sellers}
            getOptionLabel={(option) => {
              return `${option.firstName.trim()} ${option.lastName.trim()}`;
            }}
            onChange={onTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Vendedor"
                placeholder="Vendedor"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Stack>
      </InputContainer>
      <InputContainer
        label="Sucursal"
        style={{ marginBottom: "10px" }}
        required
        fullWidth
        variant="standard"
      >
        <InputLabel id="sucursal-label">Sucursal</InputLabel>
        <Select id="sucursal" name="idSucursal" onChange={onChange}>
          <MenuItem value={1}>Principal (Casanova)</MenuItem>
          <MenuItem value={2}>Secundaria (Ramos Mejía)</MenuItem>
        </Select>
      </InputContainer>
      <TextField
        id="notas"
        name="notas"
        label="Notas adicionales (Opcional)"
        inputProps={{ maxLength: 100 }}
        onChange={onChange}
        fullWidth
        variant="standard"
        style={{ marginBottom: "20px" }}
      />
      <FormHelperText>
        Ej: El cliente no recordaba el nombre del vendedor
      </FormHelperText>
    </CartForm>
  );
};

export default MostradorForm;
