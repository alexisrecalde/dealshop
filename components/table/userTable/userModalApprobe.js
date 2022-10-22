import { useState, Fragment } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import styled from 'styled-components';
import { patchUserData, postRecoverPassword } from '../../../queries/users/users.queries';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

import CustomButtonComponent from '../../customButton/customButton.component';

import { FilterHeader } from '../../filters/ordersFilter/ordersFilter.styles';

const UserModalApprobe = ({ user, userProfile, authToken }) => {
  const router = useRouter();

  const [getValue, setValue] = useState({
    phone: user.phone,
    dni: user.dni,
    dataHasBeenModified: false,
  });

  const onValueChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value, dataHasBeenModified: true });
  };

  const onModifyDataClick = async () => {
    Swal.fire({
      titleText: '¿Desea modificar su información?',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#e91e63',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        user.phone = getValue.phone;
        user.dni = getValue.dni;
        try {
          await patchUserData(user, user.token);
          Swal.fire('Listo!', 'Los datos se actualizaron correctamente', 'success').then(() => {
            router.reload().then(() => window.scrollTo(0, 0));
          });
        } catch (error) {
          Swal.fire('Error!', 'Ocurrió un error al actualizar los datos. Por favor intente mas tarde.', 'error').then(
            () => {
              router.reload().then(() => window.scrollTo(0, 0));
            }
          );
        }
      }
    });
  };

  const onClickResetPassword = async (event) => {
    event.preventDefault();
    await postRecoverPassword();

    Swal.fire({
      titleText: 'Envío de correo',
      text: 'Se ha enviado un correo con el pedido de reseteo de contraseña, siga los pasos allí indicados. Por favor, revise la bandeja de spam.',
      icon: 'success',
      reverseButtons: true,
      confirmButtonColor: '#00bcd4',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      router.push('/').then(() => window.scrollTo(0, 0));
    });
  };

  return (
    <Container>
      <FormControl disabled>
        <FilterHeader>Nombre</FilterHeader>
        <InputDisplay id="firtName" label="Nombre" variant="outlined" value={user.firstName} fullWidth />
      </FormControl>
      <FormControl disabled>
        <FilterHeader>Apellido</FilterHeader>
        <InputDisplay id="lastName" label="Apellido" variant="outlined" value={user.lastName} fullWidth />
      </FormControl>
      <FormControl disabled>
        <FilterHeader>Email</FilterHeader>
        <InputDisplay id="email" label="Email" variant="outlined" value={user.email} fullWidth />
      </FormControl>
      {userProfile ? (
        <FormControl>
          <FilterHeader>Teléfono</FilterHeader>
          <InputDisplay
            id="phone"
            name="phone"
            label="Teléfono"
            variant="outlined"
            defaultValue={getValue.phone}
            onChange={onValueChange}
            fullWidth
          />
        </FormControl>
      ) : (
        <FormControl disabled>
          <FilterHeader>Teléfono</FilterHeader>
          <InputDisplay id="phoneDisabled" label="Teléfono" variant="outlined" value={user.phone} fullWidth />
        </FormControl>
      )}

      {userProfile ? (
        <FormControl>
          <FilterHeader>Dni</FilterHeader>
          <InputDisplay
            id="dni"
            name="dni"
            label="Dni"
            variant="outlined"
            defaultValue={getValue.dni}
            onChange={onValueChange}
            fullWidth
          />
        </FormControl>
      ) : (
        <FormControl disabled>
          <FilterHeader>Dni</FilterHeader>
          <InputDisplay id="dniDisabled" label="Dni" variant="outlined" value={user.dni} fullWidth />
        </FormControl>
      )}

      {userProfile && (
        <ButtonContainer>
          <CustomButtonComponent
            style={{ margin: 20, width: '50%' }}
            onClick={onModifyDataClick}
            color="secondary"
            disabled={!getValue.dataHasBeenModified}
          >
            Modificar Datos
          </CustomButtonComponent>
          <CustomButtonComponent style={{ margin: 20, width: '50%' }} onClick={onClickResetPassword} color="secondary">
            Cambiar contraseña
          </CustomButtonComponent>
        </ButtonContainer>
      )}
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputDisplay = styled(Input)`
  & input {
    text-align: center;
  }

  & :after {
    border-color: #00bcd4;
  }
`;

export default UserModalApprobe;
