import UserActionTypes from './user.types';

export const signInUser = (user) => ({
  type: UserActionTypes.SIGN_IN,
  payload: user,
});

export const signOutUser = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export const updateUserData = (data) => ({
  type: UserActionTypes.UPDATE_DATA,
  payload: data,
});
