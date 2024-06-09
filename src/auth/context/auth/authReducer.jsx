"use client";
import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGENERATE_ACCESS_TOKEN,
  UPDATE_USER_BASIC_INFO,
} from "../actions";

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        session: payload.session,
        permissions: payload.permissions,
      };

    case REGENERATE_ACCESS_TOKEN:
      return {
        ...state,
        session: payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        session: null,
        permissions: null,
      };
    case UPDATE_USER_BASIC_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload.value,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
