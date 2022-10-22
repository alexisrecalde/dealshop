import { Container, BarContainer, ItemContainer, ItemText } from './paymentbar.styles';

import { FaCreditCard, FaRegMoneyBillAlt, FaTruck } from 'react-icons/fa';

const PaymentbarComponent = () => {
  return (
    <Container>
      <BarContainer>
        <ItemContainer>
          <FaCreditCard style={{ color: '#e91e63', fontSize: '1.8rem' }} />
          <ItemText>Tarjeta de crédito</ItemText>
        </ItemContainer>
        <ItemContainer>
          <FaCreditCard style={{ color: '#e91e63', fontSize: '1.8rem' }} />
          <ItemText>Tarjeta de débito</ItemText>
        </ItemContainer>
        <ItemContainer>
          <FaRegMoneyBillAlt style={{ color: '#e91e63', fontSize: '1.8rem' }} />
          <ItemText>Efectivo</ItemText>
        </ItemContainer>
        <ItemContainer>
          <FaTruck style={{ color: '#e91e63', fontSize: '1.8rem' }} />
          <ItemText>Envíos a todo GBA</ItemText>
        </ItemContainer>
      </BarContainer>
    </Container>
  );
};

export default PaymentbarComponent;
