import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_LOCAL_STORAGE,
  CAMBIAR_PASSWORD_REQUEST,
  CAMBIAR_PASSWORD_FAILURE,
  CAMBIAR_PASSWORD_SUCCESS,
  LOGOUT,
} from "../../types";

const initialState = {
  isAuth: localStorage.getItem("Auth") ? true : false,
  isLoading: false,
  isError: false,
  message: "",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case CAMBIAR_PASSWORD_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("Auth", true);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isError: false,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case CAMBIAR_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case REGISTER_SUCCESS:
    case CAMBIAR_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.message,
      };
    case CLEAR_LOCAL_STORAGE:
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        isError: false,
        message: "",
        user: null,
      };
    default:
      return state;
  }
};
