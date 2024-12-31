import { LOGIN_REQUEST, USER_LOGIN } from "@/app/actions/types";

const initialState = {
  loading: false,
  token: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default loginReducer;
