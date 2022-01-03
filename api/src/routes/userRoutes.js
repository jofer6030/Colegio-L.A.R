const { Router } = require("express");
const { check } = require("express-validator");
const {
  loginUser,
  registerUser,
  getUser,
  cambiarPassword,
  updateUser,
} = require("../controllers/userControllers");
const { existeUsuario } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-JWT");
const { validarCampos } = require("../middlewares/validar_campos");
const router = Router();

const userRoutes = (app) => {
  app.use("/api/users", router);

  router.post(
    "/login",
    [
      check("email", "El email es obligatorio").not().isEmpty(),
      check("password", "La contraseña es obligatoria").not().isEmpty(),
      validarCampos,
    ],
    loginUser
  );
  router.post(
    "/register",
    [
      check("first_name", "El nombre es obligatorio").not().isEmpty(),
      check("last_name", "El apellido es obligatorio").not().isEmpty(),
      check("email", "El email es obligatorio").isEmail(),
      check("password", "La contraseña es obligatoria").not().isEmpty(),
      validarCampos,
    ],
    registerUser
  );
  router.get(
    "/:id",
    [
      validarJWT,
      check("id", "El id es obligatorio").isMongoId(),
      check("id").custom((id) => existeUsuario(id)),
      validarCampos,
    ],
    getUser
  );

  router.put(
    "/:id",
    [
      validarJWT,
      check("id", "El id es obligatorio").isMongoId(),
      check("id").custom((id) => existeUsuario(id)),
      check("email", "El email es obligatorio").isEmail(),
      check("first_name", "El nombre es obligatorio").not().isEmpty(),
      check("last_name", "El apellido es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    updateUser
  );

  router.patch(
    "/cambiar_password",
    [
      check("email", "El email es obligatorio").not().isEmpty(),
      check("password", "La contraseña es obligatoria").not().isEmpty(),
      validarCampos,
    ],
    cambiarPassword
  );

  return router;
};

module.exports = { userRoutes };
