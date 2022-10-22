import { useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2';
import CustomButtonComponent from '../../customButton/customButton.component';

import { CurrencyInput, CurrencyText } from '../../../utils/number.utils';
import { addMovement } from '../../../queries/wallet/wallet.queries';
import { InputText, InputTextOutlined } from '../../input/input.styles';
import { ContentContainer, DialogHeader } from './movementDialog.style';

export default function MovementDialog({ isOpen, setOpenMovementDialog, isNegative, walletId, balance, authToken }) {
  const router = useRouter();

  const [getNewAmount, setNewAmount] = useState(0);
  const [getDescription, setDescription] = useState('');

  const handleClose = () => {
    setOpenMovementDialog(false);
  };

  const onUpdate = async () => {
    if (getDescription.length == 0) {
      Swal.fire('Atención!', 'Tenés que ingresar un motivo antes de continuar', 'warning');
    } else {
      Swal.fire({
        title: 'Confirmás que querés ' + `${isNegative ? 'descontar' : 'agregar'}`,
        text: `$${getNewAmount}`,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#e91e63',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let amount = parseFloat(getNewAmount.replace(',', ''));
            amount = isNegative ? -amount : amount;

            await addMovement(walletId, amount, getDescription, authToken);
            setOpenMovementDialog(false);
          } catch (error) {
            router.push('/error').then(() => window.scrollTo(0, 0));
          }
          router.reload().then(() => window.scrollTo(0, 0));
        }
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <ContentContainer>
          <DialogHeader>Dinero disponible</DialogHeader>
          <CurrencyText value={balance} style={{ fontSize: '1.9rem' }} />
          <DialogHeader>{isNegative ? 'Monto a descontar' : 'Monto a agregar'}</DialogHeader>
          <InputText
            id="amount"
            fullWidth
            onChange={(e) => setNewAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ fontSize: '1.6rem' }}>
                  $
                </InputAdornment>
              ),
              inputComponent: CurrencyInput,
              style: { fontSize: '1.6rem' },
            }}
          />
          <DialogHeader>Motivo</DialogHeader>
          <InputTextOutlined
            id="reason"
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
        </ContentContainer>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <CustomButtonComponent color="secondary" style={{ width: '100%' }} onClick={onUpdate}>
          Actualizar
        </CustomButtonComponent>
        <CustomButtonComponent color="primary" style={{ width: '100%' }} onClick={handleClose}>
          Cancelar
        </CustomButtonComponent>
      </DialogActions>
    </Dialog>
  );
}
