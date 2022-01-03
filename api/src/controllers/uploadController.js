const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const User = require("../models/User");
const Usuario = require("../models/Usuarios");

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el user" });
      }
      break;
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el usuario" });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  //Limpiar imagenes previas
  if (modelo.avatar) {
    const nombreArr = modelo.avatar.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  modelo.avatar = secure_url;

  await modelo.save();

  res.json(modelo);
};

module.exports = {
  actualizarImagenCloudinary,
};
