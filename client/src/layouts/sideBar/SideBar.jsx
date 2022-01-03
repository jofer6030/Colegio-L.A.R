import "./sideBar.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { useState } from "react";

const SideBar = () => {
  const location = useLocation();
  const dipatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const [show, setShow] = useState(true);

  const logoutHandler = () => {
    dipatch(logout());
    window.location.reload();
  };

  const showHandler = () => {
    setShow(!show);
  };

  return (
    <div className="sidebar">
      <div
        className={
          show
            ? "content__izquierdo__hamburger"
            : "content__izquierdo__hamburger initial"
        }
        onClick={showHandler}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={show ? "content__izquierdo" : "content__izquierdo hide"}>
        <div className="content__izquierdo__title">
          <h2>"I.E.E Luis Aguilar Romani"</h2>
          <div className="content__izquierdo__title--perfil">
            <img
              src={
                user.avatar
                  ? user.avatar
                  : "https://res.cloudinary.com/dxveca4zl/image/upload/v1640120937/user-blank_ng3p2h.png"
              }
              alt={`Perfil de ${user.first_name}`}
            />
            <p>{user.rol.toUpperCase()}</p>
            <p>
              {user.rol !== "ADMIN"
                ? `${user.nombres} ${user.apellidos}`
                : `${user.first_name} ${user.last_name}`}
            </p>
          </div>
        </div>
        <div className="content__izquierdo__menu">
          <ul>
            {user.rol === "ADMIN" ? (
              <>
                <li className={location.pathname === "/" ? "active--link" : ""}>
                  <i className="fas fa-user-plus"></i>
                  <Link to="/">Registrar Usuario</Link>
                </li>
                <li>
                  <i className="fas fa-house-user"></i>
                  <Link to="/">Salones</Link>
                </li>
                <li
                  className={
                    location.pathname === "/alumnos" ? "active--link" : ""
                  }
                >
                  <i className="fas fa-user-graduate"></i>
                  <Link to="/alumnos">Alumnos</Link>
                </li>
                <li>
                  <i className="fas fa-chalkboard-teacher"></i>
                  <Link to="/">Docentes</Link>
                </li>
              </>
            ) : (
              <li>
                <i className="fas fa-chalkboard-teacher"></i>
                <Link to="/">Home</Link>
              </li>
            )}
            <li>
              <i className="fas fa-paste"></i>
              <Link to="/">Notas</Link>
            </li>
            <li
              className={
                location.pathname === `/perfil/${user._id}`
                  ? "active--link"
                  : ""
              }
            >
              <i className="fas fa-user-circle"></i>
              <Link to={`/perfil/${user._id}`}>Perfil</Link>
            </li>
            <li onClick={logoutHandler}>
              <i className="fas fa-sign-out-alt"></i>
              <Link to="/">Salir</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={show ? "content__derecho" : "content__derecho overflow"}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
