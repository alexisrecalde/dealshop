import StepLabel from '@mui/material/StepLabel';
import { CartStepper, CartStep } from './cartStepper.styles';

const CartStepperComponent = ({ activeStep }) => {
  function getSteps() {
    return ['Datos de entrega', 'Confirmar Datos'];
  }

  const steps = getSteps();

  return (
    <CartStepper alternativeLabel activeStep={activeStep}>
      {steps.map((label) => (
        <CartStep key={label}>
          <StepLabel>{label}</StepLabel>
        </CartStep>
      ))}
    </CartStepper>
  );
};

export default CartStepperComponent;
