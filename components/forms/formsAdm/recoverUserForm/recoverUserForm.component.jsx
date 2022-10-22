import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { InputText } from '../../../input/input.styles';
import CustomButtonComponent from '../../../customButton/customButton.component';
import { SignFormDiv } from '../signForm.styles';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { postRecoverPassword } from '../../../../queries/users/users.queries';

const RecoverUserForm = ({ setOpen }) => {
  const [getEmail, setEmail] = useState('');

  const router = useRouter();

  const onClickResetPassword = async (event) => {
    event.preventDefault();
    setOpen(true);
    await postRecoverPassword({ email: getEmail });
    setOpen(false);

    Swal.fire({
      titleText: 'Envío de correo',
      text:
        'Se ha enviado un correo con el pedido de reseteo de contraseña, siga los pasos allí indicados. Por favor, revise la bandeja de spam.',
      icon: 'success',
      reverseButtons: true,
      confirmButtonColor: '#00bcd4',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      router.push('/').then(() => window.scrollTo(0, 0));
    });
  };

  return (
    <SignFormDiv>
      <form onSubmit={onClickResetPassword} style={{ padding: '20px' }}>
        <h2>Recuperar contraseña</h2>
        <InputText
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder={getEmail}
          onChange={() => setEmail(event.target.value)}
          required
          fullWidth
        />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '35px 0px' }}>
          <CustomButtonComponent onClick={onClickResetPassword} style={Styles.buttons}>
            Recuperar Contraseña
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

export default RecoverUserForm;
