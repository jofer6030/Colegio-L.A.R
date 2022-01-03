const mongoose = require("mongoose");
const moment = require("moment");

const usuariosSchema = mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
      default: "Jr.",
    },
    fecha_ingreso: {
      type: String,
      required: true,
      default: moment().format("DD-MM-YYYY"),
    },
    fecha_nacimiento: {
      type: String,
      required: true,
      default: moment().format("DD-MM-YYYY"),
    },
    dni: {
      type: Number,
      required: true,
      default: 12345678,
    },
    nombres_apoderado: String,
    apellidos_apoderado: String,
    direccion_apoderado: String,
    centro_laboral: String,
    parentesco: String,
    telCel: String,
    telFijo: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

const UsariosModel = mongoose.model("Usuario", usuariosSchema);

module.exports = UsariosModel;
