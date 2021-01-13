const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const initMiddlewares = require("./middlewares");
const initRoutes = require("./routes");
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");

const app = express();
const DB_URL = process.env.MONGODB_URI;

(async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to ${DB_URL} database`);

    initMiddlewares(app);
    initRoutes(app);
    app.use(errorHandler);
    app.use(express.static(path.join(__dirname, "../web/dist/")));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
