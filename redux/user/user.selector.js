import { createSelector } from 'reselect';

const selectUserData = (state) => state.user;

export const selectUsername = createSelector([selectUserData], (userData) => userData.firstName);

export const selectUserCompleteName = createSelector([selectUserData], (userData) => `${userData.firstName} ${userData.lastName}`);

export const selectIsUserLogged = createSelector(
    [selectUserData],
    (userData) => userData.userId != 0 && userData.token != ''
);

export const selectUserType = createSelector([selectUserData], (userData) => userData.userType);

export const selectUserToken = createSelector([selectUserData], (userData) => userData.token);

export const selectUser = createSelector([selectUserData], (userData) => userData);

export const selectUserEmail = createSelector([selectUserData], (userData) => userData.email);

export const selectUserPhone = createSelector([selectUserData], (userData) => userData.phone);

export const selectUserId = createSelector([selectUserData], (userData) => userData.userId);

export const selectUserWalletId = createSelector([selectUserData], (userData) => userData.walletId);

export const selectIsUserAdmin = createSelector(
    [selectUserData],
    (userData) => userData.userType === 1 || userData.userType === 2
);

export const selectIsSuperSeller = createSelector([selectUserData], (userData) => userData.isSuperSeller);

export const selectIsSubSeller = createSelector([selectUserData], (userData) => userData.isSubSeller);
