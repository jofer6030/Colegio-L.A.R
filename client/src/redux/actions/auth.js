import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CAMBIAR_PASSWORD_REQUEST,
  CLEAR_LOCAL_STORAGE,
  CAMBIAR_PASSWORD_FAILURE,
  CAMBIAR_PASSWORD_SUCCESS,
  LOGOUT,
} from "../types";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (user, token, message) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
      token,
      message,
    },
  };
};

export const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};

export const login = (url, user) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(url, user);
    console.log(data);
    dispatch(loginSuccess(data.user, data.token, data.msg));
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(loginFailure(error.response.data.msg));
  }
};

const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const registerSuccess = (message) => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      message,
    },
  };
};

export const registerFailure = (err) => {
  return {
    type: REGISTER_FAILURE,
    payload: err,
  };
};

export const register = (url, user) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const { data } = await axios.post(url, user);
    dispatch(registerSuccess(data.msg));
  } catch (error) {
    console.log(error.response);
    dispatch(registerFailure(error.response.data.msg));
  }
};

export const clearLocalStorage = () => {
  return {
    type: CLEAR_LOCAL_STORAGE,
  };
};

const cambiarPasswordRequest = () => {
  return {
    type: CAMBIAR_PASSWORD_REQUEST,
  };
};

const cambiarPasswordSuccess = (message) => {
  return {
    type: CAMBIAR_PASSWORD_SUCCESS,
    payload: {
      message,
    },
  };
};

export const cambiarPasswordFailure = (err) => {
  return {
    type: CAMBIAR_PASSWORD_FAILURE,
    payload: err,
  };
};

export const cambiarPassword = (url, user) => async (dispatch) => {
  dispatch(cambiarPasswordRequest());
  try {
    const { data } = await axios.patch(url, user);
    dispatch(cambiarPasswordSuccess(data.msg));
  } catch (error) {
    console.log(error.response);
    dispatch(cambiarPasswordFailure(error.response.data.msg));
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
