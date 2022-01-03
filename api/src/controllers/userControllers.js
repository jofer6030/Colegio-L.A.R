const User = require("../models/User");
const Usuario = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-JWT");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });
    const userAlumnoDocente = Usuario.findOne({ codigo: email });

    const [userAdmin, userAD] = await Promise.all([user, userAlumnoDocente]);

    if (!userAdmin && !userAD) {
      return res.status(400).json({
        msg: "El email o codigo ingresado no existe",
      });
    }

    if (userAdmin) {
      const validPass = await bcryptjs.compare(password, userAdmin.password);
      if (!userAdmin.estado) {
        return res.status(400).json({
          msg: "El usuario aun no esta permitido como administrador",
        });
      }
      if (!validPass) {
        return res.status(400).json({
          msg: "La contraseña es incorrecta",
        });
      }
      const token = await generarJWT(userAdmin._id);
      return res.status(200).json({
        msg: "Usuario logueado exitosamente",
        user: userAdmin,
        token,
      });
    }

    const validPass = await bcryptjs.compare(password, userAD.password);
    if (!validPass) {
      return res.status(400).json({
        msg: "La contraseña es incorrecta",
      });
    }
    const token = await generarJWT(userAD._id);
    res.status(200).json({
      msg: "Usuario logueado exitosamente",
      user: userAD,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado",
    });
  }
};

const registerUser = async (req, res) => {
  const { confirm_password, ...datos } = req.body;
  try {
    const user = await User.findOne({ email: datos.email });
    if (user) {
      return res.status(400).json({
        msg: "El usuario ya existe",
      });
    }

    if (datos.password !== confirm_password) {
      return res.status(400).json({
        msg: "Las contraseñas no coinciden",
      });
    }

    const newUser = new User(datos);
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(datos.password, salt);

    await newUser.save();
    res.status(201).json({ msg: "Usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado",
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      msg: "Usuario encontrado exitosamente",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado",
    });
  }
};

const cambiarPassword = async (req, res) => {
  const { password, confirm_password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "El email ingresado no existe",
      });
    }
    if (password !== confirm_password) {
      return res.status(400).json({
        msg: "Las contraseñas no coinciden",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const newPassword = await bcryptjs.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: newPassword });
    res.status(200).json({
      msg: "Contraseña cambiada exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user._id.toString() !== id) {
        return res.status(400).json({
          msg: "El email ingresado ya existe",
        });
      }
    }
    const userUpdate = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      msg: "Usuario actualizado exitosamente",
      userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  cambiarPassword,
  updateUser,
};
