import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from '@mui/material/TextField';
import { CartForm } from "../cartForm.styles";
import { InputContainer, InputText } from "../../../input/input.styles";
import FormControl from '@mui/material/FormControl';
import DateInput from "../../../input/dateInput/dateInput.component";
import Alerts from "../../../alert"

const RetiroForm = ({ getValue, setValue }) => {
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
      date.getHours() > 17 ||
      (date.getHours() === 17 && date.getMinutes() > 14)
    ) {
      date.setDate(date.getDate() + 1);
    }

    date.setHours(0, 0, 0, 0);
    return date;
  };

  const onInputLengthValidation = (e, length) => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, length);
  };

  const text="Recuerde que los pedidos por Retiro por sucursal, solo pueden tener una fecha de retiro maxima de 3 dias después de la fecha de pedido."

  return (
    <CartForm>
      <Alerts text={text}/>
      <InputContainer fullWidth required>
        <InputLabel
          htmlFor="standard-adornment-nombre"
          style={{ left: "-12px" }}
        >
          Nombre del cliente
        </InputLabel>
        <InputText
          id="standard-adornment-nombre"
          // id="nombre-cliente"
          name="nombreCliente"
          label="Nombre del cliente"
          value={getValue.nombreCliente}
          onChange={onChange}
          inputProps={{ maxLength: 200 }}
          required
          fullWidth
        />
      </InputContainer>
      <InputContainer fullWidth required>
        <InputLabel htmlFor="standard-adornment-dni" style={{ left: "-12px" }}>
          DNI
        </InputLabel>
        <InputText
          id="standard-adornment-dni"
          name="documentoCliente"
          value={getValue.documentoCliente}
          label="DNI"
          required={false}
          type="number"
          onInput={(e) => onInputLengthValidation(e, 20)}
          onChange={onChange}
          fullWidth
        />
      </InputContainer>
      <FormControl fullWidth required style={{marginBottom:"10px"}}  variant="standard">
        <DateInput
          id="standard-adornment-fecha"
          label="Fecha de retiro"
          required={true}
          onChange={onDayChange}
          disabledDays={true}
          nextDateFunc={getNextPickupDate}
          style={{ zIndex: "2" }}
          isRetiro={true}
        />
      </FormControl>
      <FormControl
        // label="Sucursal"
        style={{ marginBottom: "10px" , border:"none"}}
        required
        fullWidth
        variant="standard"
      >
        <InputLabel htmlFor="standard-adornment-sucursal">Sucursal</InputLabel>
        <Select id="standard-adornment-sucursal" name="idSucursal" onChange={onChange}>
          <MenuItem value={1}>Principal (Casanova)</MenuItem>
          <MenuItem value={2}>Secundaria (Ramos Mejía)</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="notas"
        name="notas"
        label="Notas adicionales (Opcional)"
        inputProps={{ maxLength: 100 }}
        onChange={onChange}
        fullWidth
        variant="standard" 
      />
      <FormHelperText>Ej: Paso a retirar después de las 15hs</FormHelperText>
    </CartForm>
  );
};

export default RetiroForm;