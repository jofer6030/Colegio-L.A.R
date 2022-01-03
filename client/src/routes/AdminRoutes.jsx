import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import RegistrarUsuario from "../pages/registrarUsuario/RegistrarUsuario";
import SideBar from "../layouts/sideBar/SideBar";
import Perfil from "../pages/perfil/Perfil";
import Alumnos from "../pages/alumnos/Alumnos";

const AdminRoutes = () => {
  const user = useSelector((state) => state.Auth);

  if (!user.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<SideBar />}>
          <Route index element={<RegistrarUsuario />} />
          <Route path="perfil/:id" element={<Perfil />} />
          <Route path="alumnos" element={<Alumnos />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
