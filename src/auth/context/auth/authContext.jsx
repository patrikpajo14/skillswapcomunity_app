"use client";

import React, { useReducer, useContext } from "react";
import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_BASIC_INFO,
} from "../actions";

import AuthReducer from "./authReducer";

let user;
let session;

if (typeof window !== "undefined") {
  user = localStorage.getItem("ssc_user");
  session = localStorage.getItem("ssc_session");
}
const initialState = {
  user: user ? JSON.parse(user) : null,
  session: session ? JSON.parse(session) : null,
};

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("ssc_user");
    localStorage.removeItem("ssc_session");
  };

  const updateUserBasicInfo = (value) => {
    dispatch({ type: UPDATE_USER_BASIC_INFO, payload: { value } });
    const currentUserData = JSON.parse(localStorage.getItem("ssc_user"));
    const updatedUserData = {
      ...currentUserData,
      ...value,
    };
    localStorage.setItem("ssc_user", JSON.stringify(updatedUserData));
  };

  const setLoginUserSuccess = (user, session) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {
        user,
        session,
      },
    });

    localStorage.setItem("ssc_user", JSON.stringify(user));
    localStorage.setItem("ssc_session", JSON.stringify(session));
  };

  /*   const regenerateTokens = (
    newAccessToken,
    newRefreshToken,
    expire,
    refresh_expire
  ) => {
    const existingSession = state.session;
    if (existingSession) {
      existingSession.access_token = newAccessToken;
      existingSession.refresh_token = newRefreshToken;
      existingSession.expire = expire;
      existingSession.refresh_expire = refresh_expire;
      dispatch({
        type: REGENERATE_ACCESS_TOKEN,
        payload: existingSession,
      });
      localStorage.setItem("fp_session", JSON.stringify(existingSession));
    } else {
      console.error("No existing session data found in local storage.");
    }
  }; */

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logoutUser,
        setLoginUserSuccess,
        updateUserBasicInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, initialState, useAuthContext };
