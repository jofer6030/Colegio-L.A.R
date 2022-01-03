import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { useEffect } from "react";
import { clearLocalStorage } from "./redux/actions/auth";
import { useDispatch } from "react-redux";
import CambiarContraseña from "./pages/cambiar_contraseña/CambiarContraseña";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const Token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Token) {
      dispatch(clearLocalStorage());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AdminRoutes />} />
        <Route path="login" element={<Login />} />
        <Route path="cambiar_contra" element={<CambiarContraseña />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
