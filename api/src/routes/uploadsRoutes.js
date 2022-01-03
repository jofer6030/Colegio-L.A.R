const { Router } = require("express");
const { check } = require("express-validator");
const {
  actualizarImagenCloudinary,
} = require("../controllers/uploadController");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarArchivo } = require("../middlewares/validar-archivo");
const { validarJWT } = require("../middlewares/validar-JWT");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();

const uploadsRoutes = (app) => {
  app.use("/api/uploads", router);

  router.put(
    "/:coleccion/:id",
    [
      validarJWT,
      validarArchivo,
      check("id", "No es un ID válido").isMongoId(),
      check("coleccion").custom((c) =>
        coleccionesPermitidas(c, ["users", "usuarios"])
      ),
      validarCampos,
    ],
    actualizarImagenCloudinary
  );

  return router;
};

module.exports = { uploadsRoutes };
