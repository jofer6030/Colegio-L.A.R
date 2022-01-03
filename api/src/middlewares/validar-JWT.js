const jwt = require("jsonwebtoken");

const User = require("../models/User");

const validarJWT = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { idUsuario } = jwt.verify(token, process.env.JWT_SECRET);

    //leer al usuario que corresponde al uid
    const usuario = await User.findById(idUsuario);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en BD",
      });
    }

    //verificar si el uuid tiene estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario estado: false",
      });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
