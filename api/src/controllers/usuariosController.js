const Usuarios = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");

const usuariosRegister = async (req, res) => {
  const { codigo, confirm_password, password } = req.body;

  try {
    const usuario = await Usuarios.findOne({ codigo });
    if (usuario) {
      return res
        .status(400)
        .json({ msg: "El codigo ya pertenece a un usuario" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ msg: "Las contraseñas no coinciden" });
    }

    const nuevoUsuario = new Usuarios(req.body);
    nuevoUsuario.password = await bcryptjs.hash(password, 10);
    await nuevoUsuario.save();

    res.status(200).json({ msg: "Usuario registrado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

module.exports = { usuariosRegister };
