const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morgan("combined"));
};
