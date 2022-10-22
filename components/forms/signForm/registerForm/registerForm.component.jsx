import { useState, Fragment, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { Password } from "primereact/password";
import { useForm, Controller } from "react-hook-form";
import {
  required,
  max,
  onlyNumber,
  min,
  passwordValid,
} from "../../../utils/useMessageError";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleLogin } from "react-google-login";
import GoogleLogin from "react-google-login";
import { config } from "../../../../queries/commons.queries";

const RegisterForm = ({ isAdminPage, userEmail, setOpen }) => {
  const { publicRuntimeConfig } = getConfig();
  const [mobileView, setMobileView] = useState(false);
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dni: "",
      phone: "",
      confirmPassword: "",
      // userTypeId: 6,
    },
  });

  // const clientId =
  //   "612048381694-bv0jsot2nm80h86g6v1fu7rgvte9c2p9.apps.googleusercontent.com";

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const confirmarPassword = useRef({});
  const requiredPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,20}$/;
  confirmarPassword.current = watch("password", "");
  const [getReCaptchaIsValid, setReCaptchaIsValid] = useState(false);

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

  const url = `${publicRuntimeConfig.backend_url_client}/auth/register`;

  //const url = `${publicRuntimeConfig.backend_url}/public/security/register`;

  const postRegister = async (formData) => {
    delete formData.confirmPassword;
    setOpen(true);
    try {
      const res = await axios.post(url, formData, config);
      setOpen(false);
      const redirectURL = "/login/aprobacion";
      if (res) {
        router.push(redirectURL).then(() => window.scrollTo(0, 0));
      }
    } catch (error) {
      setOpen(false);
      if (error.response.status === 500) {
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
  };

  const onSuccessResponse = async (respuesta) => {
    const respuestUserRegistro = {
      dni: "123456789",
      email: respuesta.profileObj.email,
      firstName: respuesta.profileObj.givenName,
      lastName: respuesta.profileObj.familyName,
      password: "google1234",
      phone: "123456789",
      // image: respuesta.profileObj.imageUrl,
    };
    await postRegister(respuestUserRegistro);
  };

  const onClickRegister = async (data) => {
    if (emptyFields(data)) {
      Swal.fire({
        titleText: "Error",
        text: "Debe completar todos los campos antes de continuar.",
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
      await postRegister(data);
      reset();
    }
  };

  return (
    <div className="container-sing-in">
      {mobileView ? (
        <div className="logo-sign-in-mobile">
          <Link href="/">
            <a>
              <img src="/img/logo_final.png" alt="logo dealshop" />
              <h1 variant="h1" style={{ marginLeft: "10px", fontSize: "15px" }}>
                DealShop
              </h1>
            </a>
          </Link>
        </div>
      ) : (
        <div className="logo-sign-in">
          <Link href="/">
            <a>
              <img src="/img/logo_final.png" alt="logo dealshop" />
              <h1 variant="h1">DealShop</h1>
            </a>
          </Link>
        </div>
      )}
      <div className="container-register">
        <form
          style={{ padding: "20px 0px" }}
          onSubmit={handleSubmit(onClickRegister)}
        >
          {isAdminPage ? (
            <Fragment>
              <h2>Crear nueva cuenta</h2>
              <p>Registre a un usuario usando un mail, contraseña y rol</p>
            </Fragment>
          ) : (
            <Fragment>
              <h2>Registrate</h2>
            </Fragment>
          )}
          <div className="container-register-form">
            <div className="container-one-register">
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Se permite solo letras",
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <InputText
                    id="firstName"
                    value={value}
                    name={name}
                    label="Nombre"
                    onChange={(value) => onChange(value)}
                    required
                    placeholder="Nombre"
                    fullWidth
                  />
                )}
              />
              {errors.firstName && (
                <small className="p-error">{errors.firstName.message}</small>
              )}
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Se permite solo letras",
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <InputText
                    id="lastName"
                    value={value}
                    name={name}
                    placeholder="Apellido"
                    label="Apellido"
                    onChange={(value) => onChange(value)}
                    required
                    fullWidth
                  />
                )}
              />
              {errors.lastName && (
                <small className="p-error">{errors.lastName.message}</small>
              )}
              <Controller
                name="dni"
                control={control}
                rules={{
                  required: required("dni"),
                  pattern: {
                    value: /^[0-9]*$/,
                    message: onlyNumber("dni"),
                  },
                  minLength: {
                    value: 8,
                    message: min("Dni", 8),
                  },
                  maxLength: {
                    value: 8,
                    message: max("Dni", 8),
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <InputText
                    value={value}
                    name={name}
                    label="DNI"
                    placeholder="DNI"
                    onChange={(value) => onChange(value)}
                    required
                    fullWidth
                  />
                )}
              />
              {errors.dni && (
                <small className="p-error">{errors.dni.message}</small>
              )}
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El telefono es requerido",
                  },
                  pattern: {
                    value: /^[0-9 () + , . -- x]+$/,
                    message: onlyNumber("telefono"),
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <InputText
                    value={value}
                    name={name}
                    label="Teléfono"
                    placeholder="Teléfono"
                    onChange={(value) => onChange(value)}
                    required
                    fullWidth
                  />
                )}
              />
              {errors.phone && (
                <small className="p-error">{errors.phone.message}</small>
              )}
            </div>
            <div className="container-two-register">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El email es requerido",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Se permite solo formato e-mail",
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <InputText
                    id="email"
                    value={value}
                    name={name}
                    label="Email"
                    type="email"
                    placeholder="E-mail"
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
              {errors.email && (
                <small className="p-error">{errors.email.message}</small>
              )}
              <Controller
                name="password"
                control={control}
                rules={{
                  pattern: {
                    value: requiredPassword || required("Password"),
                    message: passwordValid("Password"),
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <Password
                    id="password"
                    value={value}
                    name={name}
                    placeholder="Contraseña"
                    onChange={(value) => onChange(value)}
                    fullWidth
                    className="password-sing-in"
                    style={{ width: "100%" }}
                    feedback={false}
                    toggleMask
                  />
                )}
              />
              {errors.password && (
                <small className="p-error">{errors.password.message}</small>
              )}
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  pattern: {
                    value: requiredPassword || required("Password"),
                    message: passwordValid("Password"),
                  },
                  validate: (value) =>
                    value === confirmarPassword.current ||
                    "Las contraseñas no coinciden.",
                }}
                render={({ field: { onChange, value, name } }) => (
                  <Password
                    value={value}
                    name={name}
                    feedback={false}
                    toggleMask
                    id="confirmPassword"
                    onChange={(value) => onChange(value)}
                    placeholder="Confirme su contraseña"
                    fullWidth
                    className="password-sing-in"
                    style={{ width: "100%" }}
                  />
                )}
              />
              {errors.confirmPassword && (
                <small className="p-error">
                  {errors.confirmPassword.message}
                </small>
              )}
              <ReCAPTCHA
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                }}
                sitekey={`${publicRuntimeConfig.recaptcha_key}`}
                onChange={onChangeReCaptcha}
              />
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="container-regis-inic"
          >
            <button
              className="button-inicio-sesion"
              type="submit"
              // onClick={onClickRegister}
              style={Styles.buttons}
              style={{ width: "200px" }}
            >
              Registrarme
            </button>
          </div>
          {/* <Divider align="center" className="divider-sign-in">
            <div className="b-divider">Ó registrate con</div>
          </Divider> */}
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <GoogleLogin
              clientId="612048381694-bv0jsot2nm80h86g6v1fu7rgvte9c2p9.apps.googleusercontent.com"
              onSuccess={onSuccessResponse}
              onFailure={onSuccessResponse}
              cookiePolicy={"single_host_origin"}
            />
          </div> */}
          <div className="button-registrate-sign-in">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login">
              <a>Inicia sesión</a>
            </Link>
          </div>
        </form>
      </div>
      <img src="img/Deco.png" alt="" />
    </div>
  );
};

const Styles = {
  buttons: {
    fontSize: "1em",
    padding: "10px 30px 30px",
  },
};

export default RegisterForm;
