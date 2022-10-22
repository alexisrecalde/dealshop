import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

import CustomButtonComponent from '../../customButton/customButton.component';
import SellerInput from '../../input/sellerInput/sellerInput.component';

import { patchSuperseller } from '../../../queries/users/users.queries';

const AssignSupersellerDialogComponent = ({ sellerId, isOpen, setOpen, authToken, possibleSellers }) => {
  const router = useRouter();
  const [getSuperSellerId, setSuperSellerId] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const onAssignSuperseller = async () => {
    const seller = possibleSellers.find((seller) => seller.id == getSuperSellerId.id);

    Swal.fire({
      title: `¿Está seguro que deseas asignar como sub vendedor de ${seller.firstName ? seller.firstName : ''} ${
        seller.lastName ? seller.lastName : ''
      }?`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#e91e63',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await patchSuperseller({ userId: sellerId, superSellerId: getSuperSellerId.id }, authToken);

          Swal.fire({
            title: 'Listo!',
            text: 'Vendedor lider asignado',
            icon: 'success',
            confirmButtonColor: '#00bcd4',
          }).then(() => {
            handleClose();
            router.reload().then(() => window.scrollTo(0, 0));
          });
        } catch (e) {
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrió un error al asignar el vendedor lider. Por favor intente mas tarde.',
            icon: 'error',
            confirmButtonColor: '#00bcd4',
          }).then(() => {
            handleClose();
            router.reload().then(() => window.scrollTo(0, 0));
          });
        }
      }
    });
  };

  return (
    <Fragment>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Asignar como sub vendedor de:</DialogTitle>
        <DialogContent>
          <SellerInput data={possibleSellers} fieldName="id" getValue={getSuperSellerId} setValue={setSuperSellerId} />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <CustomButtonComponent color="secondary" style={{ width: '100%' }} onClick={onAssignSuperseller}>
            Asignar
          </CustomButtonComponent>
          <CustomButtonComponent color="primary" style={{ width: '100%' }} onClick={handleClose}>
            Cancelar
          </CustomButtonComponent>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AssignSupersellerDialogComponent;
