// src/reducers/authReducer.js

import { FOLLOW_USER, FOLLOWING_USER, REGISTER_REQUEST, USER_REGISTER } from "../app/actions/types";

const initialState = {
  registerData: "",
  loading: false,
  followUser: "",
  followingUser: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER:
      return {
        ...state,
        loading: false,
        registerData: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        loading: false,
        followUser: action.payload,
      };
    case FOLLOWING_USER:
      return {
        ...state,
        loading: false,
        followingUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
