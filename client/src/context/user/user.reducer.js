import { LOGIN_USER, LOGOUT_USER } from "./user.types";

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_USER:
      return "";
    default:
      return state;
  }
};

export default userReducer;
