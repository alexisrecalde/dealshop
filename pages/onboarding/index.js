import React, { useState, useRef, useEffect } from "react";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../../queries/commons.queries";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { isValidEmail } from "../../utils/general.utils";
import { Password } from "primereact/password";
import ReCAPTCHA from "react-google-recaptcha";
import DiaglogFelicitaciones from "../../components/diaglogFelicitaciones";
import { useForm, Controller } from "react-hook-form";
import {
  required,
  max,
  onlyNumber,
  min,
  passwordValid,
} from "../../components/utils/useMessageError";
import CarouselOnboarding from "../../components/carouselOnboarding";

export default function Onboarding() {
  const { publicRuntimeConfig } = getConfig();
  const [mobileView, setMobileView] = useState(false);
  const [getReCaptchaIsValid, setReCaptchaIsValid] = useState(false);
  const [congratulations, setCongratulations] = useState(false);
  const {
    control,
    watch,
    formState: { isValid, isSubmitted, errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      dni: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      userTypeId: 0,
    },
  });

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const confirmarPassword = useRef({});
  const requiredPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,20}$/;
  confirmarPassword.current = watch("password", "");

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      paritialVisibilityGutter: 50,
    },
  };

  function onChangeReCaptcha(value) {
    setReCaptchaIsValid(true);
  }

  const router = useRouter();

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const url = `${publicRuntimeConfig.backend_url}/public/security/register`;

  const postRegister = async (formData) => {
    try {
      let registerRequest = { ...formData, userTypeId: 0 };
      const res = await axios.post(url, registerRequest, config);
      setCongratulations(true);
      reset();
    } catch (error) {
      if (error.response.status === 409 || error.response.statu === 500) {
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

  const onCongratulationsClose = () => {
    const redirectURL = "/onboarding";
    router.push(redirectURL).then(() => window.scrollTo(0, 0));
  };

  const onClickRegister = async (formData) => {
    if (!getReCaptchaIsValid) {
      Swal.fire({
        titleText: "Error",
        text: "Debe clickear el CAPTCHA.",
        icon: "error",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      });
    } else {
      await postRegister(formData);
    }
  };

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Onboarding</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Busqueda de productos" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <>
      {header()}
      <div className="container-onboarding">
        <div className="sell-container">
          <Button
            className="button-slide sign-in-button p-button-info seller-button"
            onClick={executeScroll}
          >
            Quiero ser vendedor
          </Button>
        </div>
        <div className="onboarding-items">
          <div className="items-vendedor">
            <img src="/img/banners/hombre.png" alt="" />
            <div className="contenedor-onboarding-opciones">
              <p className="title-onboarding-opciones">
                <font color="#e91e63" style={{ fontWeight: "bold" }}>
                  DealShops
                </font>{" "}
                <font color="#000" style={{ fontWeight: "bold" }}>
                  {" "}
                  es tu plataforma de ventas de confianza
                </font>
              </p>
              <ul className="ul-options-onboarding">
                <li>Seguridad en tus ventas</li>
                <li>Ventas protegidas por mercado pago</li>
                <li>Envíos rápidos y seguros</li>
              </ul>
            </div>
          </div>
          <div className="title-2-onboarding">
            Tareas y beneficios de un vendedor
          </div>
          <div className="items-vendedor">
            <div
              className="title-onboarding-opciones"
              style={{ marginRight: "29px" }}
            >
              <ul className="ul-options-onboarding">
                <li>Ofrece nuestros productos</li>
                <li>Gana excelentes comisiones</li>
                <li>No requiere inversión para obtener ingresos</li>
                <li>Obtiene envíos gratis en todas sus compras</li>
              </ul>
            </div>
            <img src="/img/banners/Mujerhombre.png" alt="" />
          </div>
        </div>
        <div className="como-ser-vendedor-container">
          <h5>¿Cómo es ser vendedor en DealShop?</h5>
          <div className="cards-onboarding-como-ser">
            {mobileView ? (
              <CarouselOnboarding />
            ) : (
              <>
                <div className="cards-ser-vendedor">
                  <img src="/img/banners/frametarjeta.png" alt="" />
                  <div>Seguridad en los pagos</div>
                  <span>
                    Brindá seguridad en los pagos de tus usuarios, concretando
                    cada venta a través de Mercado Pago
                  </span>
                </div>
                <div className="cards-ser-vendedor card-white">
                  <img src="/img/banners/frameshop.png" alt="" />
                  <div>Potencias tus ventas</div>
                  <span>
                    Contamos con publicidad, y somos una plataforma ágil para la
                    realización de la compra
                  </span>
                </div>
                <div className="cards-ser-vendedor">
                  <img src="/img/banners/shipitem.png" alt="" />
                  <div>Seguridad en los envíos</div>
                  <span>
                    Las compras llegan en excelentes condiciones, tus envíos son
                    seguros
                  </span>
                </div>
                <div className="cards-ser-vendedor card-white">
                  <img src="/img/banners/cash.png" alt="" />
                  <div>Pagos en efectivo</div>
                  <span>
                    Contamos con la posibilidad de abonar sus compras mediante
                    pago fácil ó rapipago
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="form-ser-vendedor" id="form-ser" ref={myRef}>
          <div className="title-form-registro-onboarding">
            Llená el siguiente formulario para ser vendedor
          </div>
          <div className="container-register ">
            <form
              style={{ padding: "20px 0px", zIndex: "1000" }}
              className="container-register-onboarding"
              onSubmit={handleSubmit(onClickRegister)}
            >
              <div>
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
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Se permite solo letras",
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
                  name="DNI"
                  control={control}
                  rules={{
                    required: required("dni"),
                    pattern: {
                      value: /^[0-9]*$/,
                      message: onlyNumber("dni"),
                    },
                    minLength: {
                      value: 8,
                      message: min("dni", 8),
                    },
                    maxLength: {
                      value: 8,
                      message: max("dni", 8),
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
              </div>
              <div>
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
              <button
                className="button-inicio-sesion button-registro-onboarding"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
        <DiaglogFelicitaciones
          congratulations={congratulations}
          setCongratulations={setCongratulations}
          onCongratulationsClose={onCongratulationsClose}
        ></DiaglogFelicitaciones>
      </div>
    </>
  );
}
