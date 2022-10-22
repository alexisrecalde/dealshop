import axios from 'axios';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { InputContainer, InputPasswordField } from '../../../input/input.styles';
import InputLabel from '@mui/material/InputLabel';
import CustomButtonComponent from '../../../customButton/customButton.component';
import { SignFormDiv } from '../signForm.styles';
import { useEffect, useState, Fragment } from 'react';
import Swal from 'sweetalert2';

import PasswordStrengthMeter from '../../../passwordStrengthMeter/passwordStrengthMeter';

const ResetPasswordForm = ({ setOpen }) => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  const { uuid, email } = router.query;

  const [getValue, setValue] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    userTypeId: 0,
  });
  const [getPasswordSafety, setPasswordSafety] = useState(0);

  const onChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      'content-type': 'application/json',
      'x-client-id': '6eb59dd2-7a48-4a13-9110-b78c56a3f861',
    },
  };

  useEffect(async () => {
    const url = `${publicRuntimeConfig.backend_url}/public/security/recover-user`;
    const headers = {
      'content-type': 'application/json',
      'x-client-id': '6eb59dd2-7a48-4a13-9110-b78c56a3f861',
    };

    try {
      const params = { recoverCode: uuid, email: email };

      await axios.get(url, { headers, params });
    } catch (error) {
      Swal.fire({
        titleText: 'Error',
        text: 'El reseteo de contraseña ha expirado o ya ha sido utilizado. Vuelva a pedirlo.',
        icon: 'error',
        reverseButtons: true,
        confirmButtonColor: '#00bcd4',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        router.push('/').then(() => window.scrollTo(0, 0));
      });
    }
  }, []);

  const postResetPassword = async () => {
    setOpen(true);
    if (getValue.password != getValue.confirmPassword) {
      setOpen(false);
      Swal.fire({
        titleText: 'Error',
        text: 'Las contraseñas no coinciden. Por favor, asegurese que las mismas sean iguales.',
        icon: 'error',
        reverseButtons: true,
        confirmButtonColor: '#00bcd4',
        confirmButtonText: 'Aceptar',
      });
    } else {
      if (getPasswordSafety < 3) {
        setOpen(false);
        Swal.fire({
          titleText: 'Error',
          text: 'La contraseña debe tener mínimo como nivel de seguridad "Muy bien"',
          icon: 'error',
          reverseButtons: true,
          confirmButtonColor: '#00bcd4',
          confirmButtonText: 'Aceptar',
        });
      } else {
        const url = `${publicRuntimeConfig.backend_url}/public/security/password-reset`;

        try {
          const resetPasswordRequest = { email: email, newPassword: getValue.password, recoverCode: uuid };
          const { data } = await axios.post(url, resetPasswordRequest, config);

          Swal.fire({
            titleText: 'Éxito',
            text: 'Su contraseña ha sido reseteada con éxito.',
            icon: 'success',
            reverseButtons: true,
            confirmButtonColor: '#00bcd4',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            router.push('/login').then(() => window.scrollTo(0, 0));
          });
        } catch (error) {
          setOpen(false);
          Swal.fire({
            titleText: 'Error',
            text: 'Hubo un error, intente nuevamente.',
            icon: 'error',
            reverseButtons: true,
            confirmButtonColor: '#00bcd4',
            confirmButtonText: 'Aceptar',
          });
          setValue({ password: '', confirmPassword: '' });
        }
      }
    }
  };

  const onClickResetPassword = async (event) => {
    event.preventDefault();
    await postResetPassword();
  };

  return (
    <SignFormDiv>
      <form onSubmit={onClickResetPassword} style={{ padding: '20px' }}>
        <h2>Resetear contraseña</h2>
        <InputContainer fullWidth required>
          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <InputPasswordField id="password" name="password" onChange={onChange} fullWidth />
        </InputContainer>

        {getValue.password != '' ? (
          <PasswordStrengthMeter
            password={getValue.password}
            setPasswordSafety={setPasswordSafety}
            style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}
          />
        ) : (
          <Fragment />
        )}
        <InputContainer fullWidth required>
          <InputLabel htmlFor="confirmPassword">Confirme su contraseña</InputLabel>
          <InputPasswordField id="confirmPassword" name="confirmPassword" onChange={onChange} fullWidth />
        </InputContainer>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '35px 0px' }}>
          <CustomButtonComponent onClick={onClickResetPassword} style={Styles.buttons}>
            Cambiar Contraseña
          </CustomButtonComponent>
        </div>
      </form>
    </SignFormDiv>
  );
};

const Styles = {
  buttons: {
    fontSize: '1em',
  },
  link: {
    color: '#fff00f',

    '& :hover': {
      color: '#00ffff',
    },
  },
};

ResetPasswordForm.propTypes = {
  signInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signInUser: (userData) => dispatch(signInUser(userData)),
});

export default connect(null, mapDispatchToProps)(ResetPasswordForm);
