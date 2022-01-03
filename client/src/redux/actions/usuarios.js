import axios from "axios";
import {
  LIMPIAR_MENSAJE,
  REGISTRO_USUARIO_FAILURE,
  REGISTRO_USUARIO_REQUEST,
  REGISTRO_USUARIO_SUCCESS,
  UPDATE_USUARIO_FAILURE,
  UPDATE_USUARIO_REQUEST,
  UPDATE_USUARIO_SUCCESS,
} from "../types";

const registerRequest = () => ({
  type: REGISTRO_USUARIO_REQUEST,
});

const registerSuccess = (msg) => ({
  type: REGISTRO_USUARIO_SUCCESS,
  payload: msg,
});

const registerError = (msg) => ({
  type: REGISTRO_USUARIO_FAILURE,
  payload: msg,
});

const limpiarMensaje = (msg) => ({
  type: LIMPIAR_MENSAJE,
  payload: msg,
});

export const registerUser = (url, user, limpiar) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(registerRequest());
  try {
    const { data } = await axios.post(url, user, {
      headers: {
        Authorization: token,
      },
    });
    dispatch(registerSuccess(data.msg));
    limpiar();
  } catch (error) {
    dispatch(registerError("Error al registrar usuario"));
  }

  //limpiar mensaje
  setTimeout(() => {
    dispatch(limpiarMensaje(""));
  }, 3000);
};

const updateUserRequest = () => {
  return {
    type: UPDATE_USUARIO_REQUEST,
  };
};

const updateUserSuccess = (msg, user) => {
  return {
    type: UPDATE_USUARIO_SUCCESS,
    payload: {
      msg,
      user,
    },
  };
};

const updateUserError = (msg) => {
  return {
    type: UPDATE_USUARIO_FAILURE,
    payload: msg,
  };
};

export const updateUser = (url, user, limpiar) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(updateUserRequest());
  try {
    const { data } = await axios.put(url, user, {
      headers: {
        Authorization: token,
      },
    });
    dispatch(updateUserSuccess(data.msg, data.userUpdate));
    limpiar();
  } catch (error) {
    dispatch(updateUserError("Error al actualizar usuario"));
  }

  //limpiar mensaje
  setTimeout(() => {
    dispatch(limpiarMensaje(""));
    window.location.reload();
  }, 2000);
};
