import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  userId: 0,
  token: "",
  userType: 0,
  userTypeDesc: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  dni: 0,
  walletId: 0,
  isSuperSeller: false,
  isSubSeller: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN:
      if (action.payload.user.userType.id === 6) {
        return {
          ...state,
          userId: action.payload.user.id,
          token: action.payload.token,
          userType: action.payload.user.userType.id,
          // userTypeDesc: action.payload.user.userType.description,
          email: action.payload.user.email,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          phone: action.payload.user.phone,
          dni: action.payload.user.dni,
          // walletId: action.payload.user.wallet.id
          //   ? action.payload.user.wallet.id
          //   : 0,
          // isSuperSeller: action.payload.user.isSuperSeller,
          // isSubSeller: action.payload.user.superSellerId != null,
        };
      } else {
        return {
          ...state,
          userId: action.payload.user.id,
          token: action.payload.token,
          userType: action.payload.user.userType.id,
          userTypeDesc: action.payload.user.userType.description,
          email: action.payload.user.email,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          phone: action.payload.user.phone,
          dni: action.payload.user.dni,
          walletId: action.payload.user.wallet.id
            ? action.payload.user.wallet.id
            : 0,
          isSuperSeller: action.payload.user.isSuperSeller,
          isSubSeller: action.payload.user.superSellerId != null,
        };
      }

    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        userId: 0,
        token: "",
        userType: 0,
        userTypeDesc: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        dni: 0,
        walletId: 0,
        isSuperSeller: false,
        isSubSeller: false,
      };
    case UserActionTypes.UPDATE_DATA:
      return {...state}
      if (action.payload.user.userType.id === 6) {

        return {
          ...state,
          user: action.payload
        };
      } else {
        return {
          ...state,
          token: action.payload.token,
          userType: action.payload.userType,
          userTypeDesc: action.payload.userTypeDesc,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.phone,
          dni: action.payload.dni,
          isSuperSeller: action.payload.isSuperSeller,
        };
      }

    default:
      return state;
  }
};

export default userReducer;
