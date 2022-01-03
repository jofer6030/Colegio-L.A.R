import "./login.scss";
import FormularioLogReg from "../../components/Formulario/Formulario";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearLocalStorage } from "../../redux/actions/auth";

const Login = () => {
  const auth = useSelector((state) => state.Auth);
  const { isError, message, isAuth } = auth;
  const [datas, setDatas] = useState({
    title: "¡Bienvenido de nuevo!",
    text: "LOG IN",
  });
  const [typing, setTyping] = useState(false);

  const { title, text } = datas;

  const dispatch = useDispatch();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const toggle = (tipo) => {
    setTyping(false);
    dispatch(clearLocalStorage());
    if (tipo === "login") {
      setDatas({
        title: "¡Bienvenido de nuevo!",
        text: "LOG IN",
      });
    } else {
      setDatas({
        title: "Registrate gratis",
        text: "REGISTER",
      });
    }
  };

  return (
    <div className="login">
      {message.length > 0 && (
        <h2 className={isError ? "error" : "success"}>{message}</h2>
      )}
      <div className="login_container">
        <div className="toggle">
          <button
            className={text === "LOG IN" ? "btn active" : "btn inactive"}
            onClick={() => toggle("login")}
          >
            Login
          </button>
          <button
            className={text === "REGISTER" ? "btn active" : "btn inactive"}
            onClick={() => toggle("register")}
          >
            Registro
          </button>
        </div>
        <h2 className="title">{title}</h2>
        <FormularioLogReg
          text={text}
          typing={typing}
          setTyping={setTyping}
          setDatas={setDatas}
        />
      </div>
    </div>
  );
};

export default Login;
