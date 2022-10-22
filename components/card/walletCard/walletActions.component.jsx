import CustomButtonComponent from '../../customButton/customButton.component';

import { ButtonContainer, Icon } from './walletCard.styles';

const WalletActionsComponent = ({ setIsNegative, setOpenMovementDialog }) => {
  return (
    <ButtonContainer>
      <CustomButtonComponent
        color="secondary"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          fontSize: '1.1rem',
        }}
        onClick={() => {
          setIsNegative(false), setOpenMovementDialog(true);
        }}
      >
        <Icon src="/img/icons/wallet_ganancia.png" />
        Agregar Dinero
      </CustomButtonComponent>
      <CustomButtonComponent
        color="secondary"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          fontSize: '1.1rem',
        }}
        onClick={() => {
          setIsNegative(true), setOpenMovementDialog(true);
        }}
      >
        <Icon src="/img/icons/wallet_descuento.png" />
        Descontar Dinero
      </CustomButtonComponent>
    </ButtonContainer>
  );
};

export default WalletActionsComponent;
