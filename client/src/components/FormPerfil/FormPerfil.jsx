import "./formPerfil.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { url } from "../../config/url";
import axios from "axios";
import { useState } from "react";
import { updateUser } from "../../redux/actions/usuarios";

const FormPerfil = () => {
  const user = useSelector((state) => state.Auth.user);
  const usuario = useSelector((state) => state.Usuarios);
  const { isError, msg } = usuario;
  const dispatch = useDispatch();
  const { first_name, last_name, email, avatar } = user;
  const [img, setImg] = useState(avatar);
  const [loading, setLoading] = useState(false);

  const updateUsuarioSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del usuario es obligatorio"),
    last_name: Yup.string()
      .min(3, "El apellido es muy corto")
      .max(20, "El apellido es muy largo")
      .required("El apellido del usuario es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El email del usuario es obligatorio"),
  });

  const handleSubmit = (values, resetForm) => {
    dispatch(updateUser(`${url}/users/${user._id}`, values, resetForm));
  };

  const fileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("archivo", file);
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${url}/uploads/users/${user._id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImg(data.avatar);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
      <Formik
        initialValues={{
          first_name,
          last_name,
          email,
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        validationSchema={updateUsuarioSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="form__actualizar__user">
              <div className="form__actualizar__user__input">
                <label htmlFor="first_name">
                  Nombres <span>*</span>
                </label>
                <Field name="first_name" type="text" />
                {errors.first_name && touched.first_name ? (
                  <p className="alerta__error">{errors.first_name}</p>
                ) : null}
              </div>
              <div className="form__actualizar__user__input">
                <label htmlFor="last_name">
                  Apeliidos <span>*</span>
                </label>
                <Field name="last_name" type="text" />
                {errors.last_name && touched.last_name ? (
                  <p className="alerta__error">{errors.last_name}</p>
                ) : null}
              </div>
              <div className="form__actualizar__user__input">
                <label htmlFor="email">
                  Correo <span>*</span>
                </label>
                <Field name="email" type="email" />
                {errors.email && touched.email ? (
                  <p className="alerta__error">{errors.email}</p>
                ) : null}
              </div>
              <p style={{ marginBottom: "0.5rem", fontSize: "16px" }}>
                <b>
                  Nota: Es preferible que la imagen tenga medidas iguales (ancho
                  y alto)
                </b>
              </p>
              <div className="form__actualizar__user__input--img">
                <label htmlFor="avatar">
                  Cambiar Imagen
                  <i className="fas fa-upload"></i>
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={fileHandler}
                  accept="image/*"
                  hidden
                />
                <img
                  src={img}
                  alt={`Imagen de ${first_name}`}
                  style={{ opacity: loading ? "0.5" : "" }}
                />
                {loading ? (
                  <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                  </div>
                ) : null}
              </div>
              <button type="submit">Actualizar</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormPerfil;
