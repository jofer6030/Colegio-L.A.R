const jwt = require("jsonwebtoken");

const generarJWT = async (idUsuario) => {
  return new Promise((resolve, reject) => {
    const payload = { idUsuario }; //uid: uid

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puedo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
