const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosRegister } = require("../controllers/usuariosController");
const { rolesPermitidos } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-JWT");
const { validarCampos } = require("../middlewares/validar_campos");
const router = Router();

const usuariosRoute = (app) => {
  app.use("/api/usuarios", router);

  router.post(
    "/register",
    [
      validarJWT,
      check("codigo", "El codigo es obligatorio").not().isEmpty(),
      check("password", "La contraseña es obligatoria").not().isEmpty(),
      check("nombres", "El nombre es obligatorio").not().isEmpty(),
      check("apellidos", "El apellido es obligatorio").not().isEmpty(),
      check("rol").custom((rol) =>
        rolesPermitidos(rol, ["ESTUDIANTE", "DOCENTE"])
      ),
      validarCampos,
    ],
    usuariosRegister
  );

  return router;
};

module.exports = { usuariosRoute };
