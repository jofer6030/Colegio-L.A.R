const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const { dbConnect } = require("./config/dbConnect");
const { userRoutes } = require("./routes/userRoutes");
const { usuariosRoute } = require("./routes/usuariosRoute");
const { uploadsRoutes } = require("./routes/uploadsRoutes");
dbConnect();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

userRoutes(app);
usuariosRoute(app);
uploadsRoutes(app);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
