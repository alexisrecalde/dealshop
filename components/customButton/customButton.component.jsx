import React from 'react';

import { CustomPrimaryButton, CustomSecondaryButton } from './customButton.styles';

const CustomButtonComponent = ({ color, children, style, onClick, type, disabled }) => {
  return color != 'secondary' ? (
    <CustomPrimaryButton onClick={disabled ? () => {} : onClick} style={style} type={type} disabled={disabled}>
      {children}
    </CustomPrimaryButton>
  ) : (
    <CustomSecondaryButton onClick={disabled ? () => {} : onClick} style={style} type={type} disabled={disabled}>
      {children}
    </CustomSecondaryButton>
  );
};

export default CustomButtonComponent;
