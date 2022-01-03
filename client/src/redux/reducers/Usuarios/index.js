import {
  LIMPIAR_MENSAJE,
  REGISTRO_USUARIO_FAILURE,
  REGISTRO_USUARIO_REQUEST,
  REGISTRO_USUARIO_SUCCESS,
  UPDATE_USUARIO_FAILURE,
  UPDATE_USUARIO_REQUEST,
  UPDATE_USUARIO_SUCCESS,
} from "../../types";

const INITIAL_STATE = {
  loading: false,
  isError: false,
  msg: "",
};

export const usuariosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTRO_USUARIO_REQUEST:
    case UPDATE_USUARIO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTRO_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        msg: action.payload,
      };
    case REGISTRO_USUARIO_FAILURE:
    case UPDATE_USUARIO_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
        msg: action.payload,
      };
    case LIMPIAR_MENSAJE:
      return {
        ...state,
        isError: false,
        msg: "",
      };
    case UPDATE_USUARIO_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        loading: false,
        isError: false,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
