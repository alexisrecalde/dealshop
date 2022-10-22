import { useState, Fragment } from 'react';

import WalletActionsComponent from './walletActions.component';
import MovementDialog from '../../dialog/movementDialog/movementDialog.component';

import { HeadContainer, DetailContainer, DetailTitle, BalanceText } from './walletCard.styles';

const WalletCardComponent = ({ isAdmin, walletId, balance, authToken }) => {
  const [isNegative, setIsNegative] = useState(false);
  const [openMovementDialog, setOpenMovementDialog] = useState(false);

  const movementDialog = () => {
    if (openMovementDialog) {
      return (
        <MovementDialog
          isOpen={openMovementDialog}
          setOpenMovementDialog={setOpenMovementDialog}
          isNegative={isNegative}
          walletId={walletId}
          balance={balance}
          authToken={authToken}
        />
      );
    }
    return;
  };

  return (
    <HeadContainer>
      <DetailContainer>
        <DetailTitle>Dinero disponible</DetailTitle>
        <BalanceText value={balance ? balance : 0} />
      </DetailContainer>
      {isAdmin ? (
        <Fragment>
          <WalletActionsComponent setIsNegative={setIsNegative} setOpenMovementDialog={setOpenMovementDialog} />
          {movementDialog()}
        </Fragment>
      ) : (
        <Fragment />
      )}
    </HeadContainer>
  );
};

export default WalletCardComponent;
