import "./registrarUsuario.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/usuarios";
import { url } from "../../config/url";

const RegistrarUsuario = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.Usuarios);
  const { isError, msg } = usuario;
  const nuevoUsuarioSchema = Yup.object().shape({
    nombres: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del usuario es obligatorio"),
    apellidos: Yup.string()
      .min(3, "El apellido es muy corto")
      .max(20, "El apellido es muy largo")
      .required("El apellido del usuario es obligatorio"),
    codigo: Yup.string()
      .min(5, "El codigo es muy corto")
      .required("El apellido del usuario es obligatorio"),
    password: Yup.string()
      .min(3, "El password es muy corto")
      .required("El password del usuario es obligatorio"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("La confirmacion de la contraseña es obligatoria"),
    rol: Yup.string().required("El rol del usuario es obligatorio"),
  });
  const handleSubmit = (values, limpiar) => {
    dispatch(registerUser(`${url}/usuarios/register`, values, limpiar));
  };

  return (
    <>
      <p
        style={{
          top: "20px",
          right: msg !== "" ? "50px" : "-100px",
        }}
        className={
          isError
            ? "alerta__error--submit alerta"
            : msg === ""
            ? "alerta"
            : "alerta__success--submit alerta"
        }
      >
        {msg}
      </p>
      <h2 className="title__admin">Registro</h2>
      <p className="indicacion">
        Los campos con el (<span>*</span>) son obligatorios:
      </p>
      <Formik
        initialValues={{
          codigo: "",
          nombres: "",
          apellidos: "",
          password: "",
          confirm_password: "",
          rol: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        validationSchema={nuevoUsuarioSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="form__registrar__usuarios">
              <div className="form__registrar__usuarios--input">
                <label htmlFor="nombres">
                  Nombres <span>*</span>
                </label>
                <Field
                  name="nombres"
                  id="nombres"
                  type="text"
                  placeholder="Ingrese Nombres del estudiante o docente"
                />
                {errors.nombres && touched.nombres ? (
                  <p className="alerta__error">{errors.nombres}</p>
                ) : null}
              </div>
              <div className="form__registrar__usuarios--input">
                <label htmlFor="apellidos">
                  Apellidos <span>*</span>
                </label>
                <Field
                  name="apellidos"
                  id="apellidos"
                  type="text"
                  placeholder="Ingrese Apellidos del estudiante o docente"
                />
                {errors.apellidos && touched.apellidos ? (
                  <p className="alerta__error">{errors.apellidos}</p>
                ) : null}
              </div>
              <div className="form__registrar__usuarios--input">
                <label htmlFor="codigo">
                  Código <span>*</span>
                </label>
                <Field
                  name="codigo"
                  id="codigo"
                  type="text"
                  placeholder="Ingrese Código del estudiante o docente"
                />
                {errors.codigo && touched.codigo ? (
                  <p className="alerta__error">{errors.codigo}</p>
                ) : null}
              </div>
              <div className="form__registrar__usuarios--input">
                <label htmlFor="password">
                  Password <span>*</span>
                </label>
                <Field
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Ingrese Password del estudiante o docente"
                />
                {errors.password && touched.password ? (
                  <p className="alerta__error">{errors.password}</p>
                ) : null}
              </div>
              <div className="form__registrar__usuarios--input">
                <label htmlFor="confirm_password">
                  Confirmación de Password <span>*</span>
                </label>
                <Field
                  name="confirm_password"
                  id="confirm_password"
                  type="password"
                  placeholder="Ingrese Confirmación de Password del estudiante o docente"
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="alerta__error">{errors.confirm_password}</p>
                ) : null}
              </div>
              <div className="form__registrar__usuarios--input">
                <label htmlFor="rol">
                  Rol <span>*</span>
                </label>
                <Field name="rol" component="select" id="rol">
                  <option disabled value="">
                    --Seleccione un rol--
                  </option>
                  <option value="estudiante">Estudiante</option>
                  <option value="docente">Docente</option>
                </Field>
                {errors.rol && touched.rol ? (
                  <p className="alerta__error">{errors.rol}</p>
                ) : null}
              </div>
              <input
                type="submit"
                value="Agregar Usuario"
                className="btn-submit"
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RegistrarUsuario;
