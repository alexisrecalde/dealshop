import React from "react";
import { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";

import Spinner from "../../components/spinner/spinner.component";
import LoginForm from "../../components/forms/signForm/loginForm/loginForm.component";
import RegisterForm from "../../components/forms/signForm/registerForm/registerForm.component";

import { TiArrowForward } from "react-icons/ti";

const Register = () => {
  const [mobileView, setMobileView] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  return (
    <div>
      <Head>
        <title>Dealshop - Login</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Login en Dealshop" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
      <div>
        <Fragment>
          <RegisterForm setOpen={setOpen} />
        </Fragment>
      </div>
      <Backdrop open={open} style={{ zIndex: "3000" }}>
        <Spinner />
      </Backdrop>
    </div>
  );
};

export default Register;
