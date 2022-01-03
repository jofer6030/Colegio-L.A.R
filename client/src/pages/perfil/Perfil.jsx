import { useSelector } from "react-redux";
import FormPerfil from "../../components/FormPerfil/FormPerfil";
import FormPerfilAD from "../../components/FormPerfilAD/FormPerfilAD";
import "./peril.scss";

const Perfil = () => {
  const user = useSelector((state) => state.Auth.user);

  return (
    <>
      <h1 className="title__admin">Tus Datos</h1>
      {user.rol === "ADMIN" ? <FormPerfil /> : <FormPerfilAD />}
    </>
  );
};

export default Perfil;
