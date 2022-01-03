import { useEffect, useState } from "react";
import "./formulario.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../config/url";
import {
  login,
  loginFailure,
  register,
  registerFailure,
} from "../../redux/actions/auth";

const FormularioLogReg = ({ text, typing, setTyping, setDatas }) => {
  const auth = useSelector((state) => state.Auth);
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const [inputRegister, setInputRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { first_name, last_name, email, confirm_password, password } =
    inputRegister;

  const dispatch = useDispatch();

  const loginChange = (e) => {
    setInputLogin({
      ...inputLogin,
      [e.target.name]: e.target.value,
    });
  };

  const registerChange = (e) => {
    setInputRegister({
      ...inputRegister,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setInputLogin({
      email: "",
      password: "",
    });
    setInputRegister({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  }, [text]);

  const datos = async (e, tipo) => {
    e.preventDefault();
    if (tipo === "LOG IN") {
      if (inputLogin.email === "" || inputLogin.password === "") {
        dispatch(loginFailure("Todos los campos son obligatorios"));
        return;
      }
      dispatch(login(`${url}/users/login`, inputLogin));
    } else {
      if (
        [first_name, last_name, email, password, confirm_password].includes("")
      ) {
        dispatch(registerFailure("Todos los campos son obligatorios"));
        return;
      }
      dispatch(register(`${url}/users/register`, inputRegister));

      if (auth.isError === false) return;

      setTimeout(() => {
        setDatas({
          title: "¡Bienvenido de nuevo!",
          text: "LOG IN",
        });
      }, 1500);
    }
  };
  const clearMensaje = () => {
    dispatch(clearLocalStorage());
  };

  return (
    <form className="formulario" onSubmit={(e) => datos(e, text)}>
      {text === "LOG IN" ? (
        <>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Correo ej: correo@correo.com <span>*</span>
            </label>
            <input
              type="text"
              onClick={() => setTyping(true)}
              onChange={loginChange}
              name="email"
              value={inputLogin.email}
              required
            />
          </div>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Password <span>*</span>
            </label>
            <input
              type="password"
              onClick={() => setTyping(true)}
              onChange={loginChange}
              name="password"
              value={inputLogin.password}
              required
            />
          </div>
          <Link
            onClick={clearMensaje}
            to="/cambiar_contra"
            className="cambiar_contraseña"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </>
      ) : (
        <>
          <div className="input names">
            <div className="input__info">
              <label className={typing ? "reduce" : ""}>
                First Name<span>*</span>
              </label>
              <input
                type="text"
                onClick={() => setTyping(true)}
                onChange={registerChange}
                name="first_name"
                value={first_name}
                required
              />
            </div>
            <div className="input__info">
              <label className={typing ? "reduce" : ""}>
                Last Name <span>*</span>
              </label>
              <input
                type="text"
                onClick={() => setTyping(true)}
                onChange={registerChange}
                name="last_name"
                value={last_name}
                required
              />
            </div>
          </div>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Correo ej: correo@correo.com <span>*</span>
            </label>
            <input
              type="text"
              onClick={() => setTyping(true)}
              onChange={registerChange}
              name="email"
              value={email}
              required
            />
          </div>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Password <span>*</span>
            </label>
            <input
              type="password"
              onClick={() => setTyping(true)}
              onChange={registerChange}
              name="password"
              value={password}
              required
            />
          </div>
          <div className="input">
            <label className={typing ? "reduce" : ""}>
              Confirma tu Password <span>*</span>
            </label>
            <input
              type="password"
              onClick={() => setTyping(true)}
              onChange={registerChange}
              name="confirm_password"
              value={confirm_password}
              required
            />
          </div>
        </>
      )}
      <button type="submit" className="btn active send">
        {text}
      </button>
    </form>
  );
};

export default FormularioLogReg;
