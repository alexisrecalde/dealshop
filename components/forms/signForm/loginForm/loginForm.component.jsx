import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { signInUser } from "../../../../redux/user/user.actions";
import { config } from "../../../../queries/commons.queries";
import Link from "next/link";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import {
  required,
  passwordValid,
} from "../../../../components/utils/useMessageError";
import GoogleLogin from "react-google-login";
import LoginError from "../../../errorModals/loginError";

const LoginForm = ({ signInUser, setOpen }) => {
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const [errorOnLogin, setErrorOnLogin] = useState(false);
  const [onLoding, setOnLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const url = `${publicRuntimeConfig.backend_url_client}/auth/login`;

  //const url = `${publicRuntimeConfig.backend_url}/public/security/authenticate`;

  const requiredPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,20}$/;

  const emptyFields = (object) => {
    let res = false;

    for (const key in object) {
      if (object[key] === "") {
        return true;
      }
    }
    return res;
  };

  // const handleSuccess = (response) => {
  //   if (response) {
  //     const accessToken = response.accessToken;

  //     const url = `${publicRuntimeConfig.backend_url_client}/google-authentication`;
  //     try {
  //       const res = await axios.post(url, accessToken, config);
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     // axios(`${process.env.REACT_APP_API_URL}/google-authentication`, {
  //     //   method: "POST",
  //     //   body: JSON.stringify({
  //     //     token: accessToken,
  //     //   }),
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     // });
  //   }
  // };

  const respuestaGoogle = async (respuesta) => {
    const resUser = {
      email: respuesta.profileObj.email,
      password: "google1234",
    };
    await postAuthenticate(resUser);
  };

  const postAuthenticate = async (data) => {
    try {
      const authenticateRequest = {
        email: data.email,
        password: data.password,
      };
      delete config.params;
      const res = await axios.post(url, authenticateRequest, config);
      signInUser(res.data);
      setOpen(false);
      reset();
      router.push("/").then(() => window.scrollTo(0, 0));
    } catch (error) {
      setOnLoading(false);
      setOpen(false);
      if (error.response.status === 400 || error.response.status === 404) {
        setErrorOnLogin(true);
      } else if (error.response.status === 500) {
        setErrorOnLogin(true);
      } else {
        router.push("/error").then(() => window.scrollTo(0, 0));
      }
    }
  };

  const onClickLogin = async (formData) => {
    setOnLoading(true);
    if (emptyFields(formData)) {
      Swal.fire({
        titleText: "Error",
        text: "Debe completar todos los campos antes de continuar.",
        icon: "error",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      });
      setOnLoading(false);
    } else {
      setOnLoading(true);
      await postAuthenticate(formData);
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
      <div className="container-form-signin">
        <form onSubmit={handleSubmit(onClickLogin)} style={{ padding: "20px" }}>
          <h2 className="inicio-sesion-mobile">Inicia Sesion</h2>
          <span className="p-input-icon-left" style={{ width: "100%" }}>
            <i className="pi pi-envelope" />
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El e-mail es requerido",
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
                  style={{ width: "100%" }}
                />
              )}
            />
          </span>
          {errors.email && (
            <small className="p-error">{errors.email.message}</small>
          )}
          <span className="p-input-icon-left" style={{ width: "100%" }}>
            <i className="pi pi-lock" style={{ zIndex: 100 }} />
            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: required("Password"),
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
          </span>
          {errors.password && (
            <small className="p-error">{errors.password.message}</small>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/login/recuperarUsuario">
              <a className="a-olvidaste-contrasena">
                ¿Olvidaste tu contraseña?
              </a>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <button
              type="submit"
              className="button-inicio-sesion"
              style={{ width: "200px" }}
            >
              {onLoding ? (
                <CircularProgress
                  size={30}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                " Iniciar sesión"
              )}
            </button>
          </div>
          {/* <Divider align="center" className="divider-sign-in">
            <div className="b-divider">o</div>
          </Divider>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <GoogleLogin
              clientId="612048381694-bv0jsot2nm80h86g6v1fu7rgvte9c2p9.apps.googleusercontent.com"
              onSuccess={respuestaGoogle}
              onFailure={respuestaGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div> */}
          <div className="button-registrate-sign-in">
            ¿No tienes una cuenta?{" "}
            <Link href="/register">
              <a>Registrate</a>
            </Link>
          </div>
        </form>
      </div>
      {errorOnLogin && (
        <LoginError
          setErrorOnLogin={setErrorOnLogin}
          errorOnLogin={errorOnLogin}
        />
      )}

      <img src="img/Deco.png" alt="" />
      {/* // <div className="sign-in"></div> */}
    </div>
  );
};

LoginForm.propTypes = {
  signInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signInUser: (userData) => dispatch(signInUser(userData)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
