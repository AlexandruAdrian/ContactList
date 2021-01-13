const initRoutes = (app) => {
  app.use("/api/users", require("./userRoutes"));
  app.use("/api/contacts", require("./contactRoutes"));
};

module.exports = initRoutes;
