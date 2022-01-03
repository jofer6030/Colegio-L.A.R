const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Conectado Exitoso");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConnect };
