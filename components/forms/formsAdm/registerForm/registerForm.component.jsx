import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import CustomButtonComponent from "../../../customButton/customButton.component";
import Input from "@mui/material/Input";
import { isValidEmail } from "../../../../utils/general.utils";
import { config } from "../../../../queries/commons.queries";
import {
  InputText,
  InputContainer,
  InputPasswordField,
} from "../../../input/input.styles";
import { SignFormDiv } from "../signForm.styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordStrengthMeter from "../../../passwordStrengthMeter/passwordStrengthMeter";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterForm = ({ isAdminPage, userEmail, setOpen }) => {
  const { publicRuntimeConfig } = getConfig();

  const [getValue, setValue] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    userTypeId: 0,
  });

  const [getIsValidEmail, setIsValidEmail] = useState(true);
  const [getReCaptchaIsValid, setReCaptchaIsValid] = useState(false);
  const [getPasswordSafety, setPasswordSafety] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onValidateEmail = (e) => {
    const isValid = isValidEmail(e.target.value);

    setIsValidEmail(isValid);
  };

  const emptyFields = (object) => {
    let res = false;

    for (const key in object) {
      if (object[key] === "") {
        return true;
      }
    }

    return res;
  };

  function onChangeReCaptcha(value) {
    setReCaptchaIsValid(true);
  }

  const router = useRouter();

  const url = `${publicRuntimeConfig.backend_url}/public/security/register`;

  const postRegister = async () => {
    setOpen(true);
    if (getValue.password != getValue.confirmPassword) {
      setOpen(false);
      Swal.fire({
        titleText: "Error",
        text: "Las contraseñas no coinciden. Por favor, asegurese que las mismas sean iguales.",
        icon: "error",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      });
    } else {
      if (getPasswordSafety < 3) {
        setOpen(false);
        Swal.fire({
          titleText: "Error",
          text: 'La contraseña debe tener mínimo como nivel de seguridad "Muy bien"',
          icon: "error",
          reverseButtons: true,
          confirmButtonColor: "#00bcd4",
          confirmButtonText: "Aceptar",
        });
      } else
        try {
          let registerRequest = { ...getValue };
          if (isAdminPage) {
            registerRequest = {
              ...registerRequest,
              approvedBy: userEmail,
              statusId: 2,
            };
          }

          await axios.post(url, registerRequest, config);
          setOpen(false);

          const redirectURL = isAdminPage ? "/admin" : "/login/aprobacion";
          router.push(redirectURL).then(() => window.scrollTo(0, 0));
        } catch (error) {
          setOpen(false);
          if (error.response.status === 409) {
            Swal.fire({
              titleText: "Error",
              text: "El mail ingresado ya se encuentra registrado.",
              icon: "error",
              reverseButtons: true,
              confirmButtonColor: "#00bcd4",
              confirmButtonText: "Aceptar",
            });
          } else {
            router.push("/error").then(() => window.scrollTo(0, 0));
          }
        }
    }
  };

  const onClickRegister = async (event) => {
    event.preventDefault();

    if (emptyFields(getValue)) {
      Swal.fire({
        titleText: "Error",
        text: "Debe completar todos los campos antes de continuar.",
        icon: "error",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      });
    } else if (!getIsValidEmail) {
      Swal.fire({
        titleText: "Error",
        text: "Debe ingresar un mail válido antes de continuar.",
        icon: "error",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      });
    } else if (!getReCaptchaIsValid) {
      Swal.fire({
        titleText: "Error",
        text: "Debe clickear el CAPTCHA.",
        icon: "error",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      });
    } else {
      await postRegister();
    }
  };

  const onInputLengthValidation = (e, length) => {
    e.target.value =
      e.target.value === ""
        ? 0
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, length);
  };

  return (
    <SignFormDiv>
      <form style={{ padding: "20px" }}>
        {isAdminPage ? (
          <Fragment>
            <h2>Crear nueva cuenta</h2>
            <p>Registre a un usuario usando un mail, contraseña y rol</p>
          </Fragment>
        ) : (
          <Fragment>
            <h2>Todavía no tengo una cuenta</h2>
            <p>Registrese usando un mail y contraseña</p>
          </Fragment>
        )}
        <TextField
          id="firstName"
          name="firstName"
          label="Nombre"
          onChange={onChange}
          required
          fullWidth
          variant="standard"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Apellido"
          onChange={onChange}
          required
          fullWidth
          variant="standard"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          id="dni"
          name="dni"
          label="DNI"
          // //type="number"
          // type="tel"
          // //inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          // onInput={(e) => onInputLengthValidation(e, 8)}
          onChange={onChange}
          required
          fullWidth
          variant="standard"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          id="phone"
          name="phone"
          label="Teléfono"
          // type="number"
          // type="tel"
          // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          //onInput={(e) => onInputLengthValidation(e, 12)}
          onChange={onChange}
          required
          fullWidth
          variant="standard"
          style={{ marginBottom: "10px" }}
        />
        <InputContainer fullWidth required variant="standard">
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            onChange={onChange}
            onBlur={onValidateEmail}
            variant="standard"
          />
          {getIsValidEmail ? (
            <Fragment />
          ) : (
            <FormHelperText error style={{ marginBottom: "7.5px" }}>
              Ingrese una dirección de email válida. Solo están permitidas
              cuentas de: Gmail, Hotmail, Live o Yahoo
            </FormHelperText>
          )}
        </InputContainer>
        <InputContainer
          fullWidth
          required
          style={{ marginBottom: "10px" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Contraseña
          </InputLabel>
          <Input
            id="standard-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            fullWidth
            variant="standard"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>Mínimo 8 caracteres</FormHelperText>
        </InputContainer>
        {getValue.password != "" ? (
          <PasswordStrengthMeter
            password={getValue.password}
            setPasswordSafety={setPasswordSafety}
            style={{ display: "flex", justifyContent: "center", margin: "5px" }}
          />
        ) : (
          <Fragment />
        )}

        <InputContainer
          fullWidth
          required
          style={{ marginBottom: "10px" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-confirmPassword">
            Confirme su contraseña
          </InputLabel>
          <Input
            id="standard-adornment-confirmPassword"
            // id="confirmPassword"
            type={showPasswordConfirm ? "text" : "password"}
            name="confirmPassword"
            onChange={onChange}
            fullWidth
            variant="standard"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirm}
                >
                  {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </InputContainer>

        {isAdminPage ? (
          <InputContainer
            fullWidth
            style={{ marginBottom: "10px" }}
            variant="standard"
          >
            <InputLabel htmlFor="userTypeId-select-input">Rol</InputLabel>
            <Select
              native
              onChange={onChange}
              value={getValue.userTypeId}
              inputProps={{
                name: "userTypeId",
                id: "userTypeId-select-input",
              }}
              required
              variant="standard"
            >
              <option aria-label="" />
              <option value={2}>Admin</option>
              <option value={3}>Vendedor</option>
              <option value={4}>Depósito</option>
              <option value={5}>Repartidor</option>
            </Select>
          </InputContainer>
        ) : (
          <Fragment />
        )}

        <ReCAPTCHA
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
          sitekey={`${publicRuntimeConfig.recaptcha_key}`}
          onChange={onChangeReCaptcha}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomButtonComponent
            type="button"
            onClick={onClickRegister}
            style={Styles.buttons}
          >
            {isAdminPage ? "Crear usuario" : "Registrarse"}
          </CustomButtonComponent>
        </div>
      </form>
    </SignFormDiv>
  );
};

const Styles = {
  buttons: {
    fontSize: "1em",
    padding: "10px 30px 30px",
  },
};

export default RegisterForm;