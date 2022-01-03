import { useState } from "react";
import "./cambiar_contraseña.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarPassword,
  cambiarPasswordFailure,
  clearLocalStorage,
} from "../../redux/actions/auth";
import { url } from "../../config/url";
import { Link, Navigate } from "react-router-dom";

const CambiarContraseña = () => {
  const [typing, setTyping] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);
  const { isError, message, isAuth } = state;
  const { email, password, confirm_password } = data;

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const cambiarChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([password, confirm_password, email].includes("")) {
      dispatch(cambiarPasswordFailure("Todos los campos son obligatorios"));
      return;
    }

    dispatch(cambiarPassword(`${url}/users/cambiar_password`, data));
  };

  const clearMensaje = () => {
    dispatch(clearLocalStorage());
  };

  return (
    <div className="cambiar_contra">
      {message.length > 0 && (
        <h2 className={isError ? "error" : "success"}>{message}</h2>
      )}
      <div className="cambiar_container">
        <h2 className="title">Cambiar Contraseña</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Correo ej: correo@correo.com <span>*</span>
            </label>
            <input
              type="email"
              onClick={() => setTyping(true)}
              onChange={cambiarChange}
              name="email"
              value={email}
            />
          </div>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Password <span>*</span>
            </label>
            <input
              type="password"
              onClick={() => setTyping(true)}
              onChange={cambiarChange}
              name="password"
              value={password}
            />
          </div>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Confirma tu Password <span>*</span>
            </label>
            <input
              type="password"
              onClick={() => setTyping(true)}
              onChange={cambiarChange}
              name="confirm_password"
              value={confirm_password}
            />
          </div>
          {message.length > 0 && !isError && (
            <Link
              onClick={clearMensaje}
              className="cambiar_contraseña"
              to="/login"
            >
              Ir Login
            </Link>
          )}
          <button type="submit" className="btn active send">
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default CambiarContraseña;
