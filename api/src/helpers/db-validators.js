const User = require("../models/User");

const rolesPermitidos = (rol = "", roles = []) => {
  const incluida = roles.includes(rol.toLocaleUpperCase());

  if (!incluida) {
    throw new Error(`El rol: ${rol}, no esta permitida`);
  }

  return true;
};

const existeUsuario = async (id) => {
  const usuario = await User.findById(id);

  if (!usuario) {
    throw new Error(`El usuario con id: ${id}, no existe`);
  }

  return true;
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(`La colección: ${coleccion}, no esta permitida`);
  }

  return true;
};

module.exports = { rolesPermitidos, existeUsuario, coleccionesPermitidas };
