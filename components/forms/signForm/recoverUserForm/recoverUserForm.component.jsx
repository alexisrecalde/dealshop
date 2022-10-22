import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
// import { InputText } from '../../../input/input.styles';
import CustomButtonComponent from "../../../customButton/customButton.component";
import { SignFormDiv } from "../signForm.styles";
import { useState } from "react";
import Swal from "sweetalert2";

import { postRecoverPassword } from "../../../../queries/users/users.queries";

const RecoverUserForm = ({ setOpen }) => {
  const [getEmail, setEmail] = useState("");
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onClickResetPassword = async (formData) => {
    if (formData.email !== "") {
      setOpen(true);
      await postRecoverPassword({ email: formData.email });
      setOpen(false);

      Swal.fire({
        titleText: "Envío de correo exitoso!",
        text: "Se ha enviado un correo con el pedido de reseteo de contraseña, siga los pasos allí indicados. Por favor, revise la bandeja de spam.",
        icon: "success",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      }).then(() => {
        router.push("/").then(() => window.scrollTo(0, 0));
      });
    } else {
      Swal.fire({
        titleText: "Complete con su correo electronico!",
        text: "Para poder resetear su contraseña necesitamos su correo electronico.",
        icon: "error",
        reverseButtons: true,
        confirmButtonColor: "#00bcd4",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <SignFormDiv>
      <form
        onSubmit={handleSubmit(onClickResetPassword)}
        style={{ padding: "20px" }}
      >
        <h2>Recuperar contraseña</h2>
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
              message: "Se permite solo formato e-mail",
            },
          }}
          render={({ field: { onChange, value, name } }) => (
            <InputText
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder={"Ingrese su correo electronico"}
              onChange={(value) => onChange(value)}
              required
              style={{ width: "90%" }}
            />
          )}
        />
        <div style={{ height: "30px" }}>
          {errors.email && (
            <small className="p-error">{errors.email.message}</small>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "35px 0px",
          }}
        >
          <CustomButtonComponent type="submit" style={Styles.buttons}>
            Recuperar Contraseña
          </CustomButtonComponent>
        </div>
      </form>
    </SignFormDiv>
  );
};

const Styles = {
  buttons: {
    fontSize: "15px",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 9,
  },
  link: {
    color: "#fff00f",

    "& :hover": {
      color: "#00ffff",
    },
  },
};

export default RecoverUserForm;
