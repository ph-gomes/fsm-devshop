const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

// Exist index in folder
const routes = require("./routes");

const init = db => {
  const categoryModel = require("./models/category")(db);

  const app = express();
  // Assign settings name to value
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  // Mounts the specified middleware, if no path uses the
  // middleware for every path
  app.use(
    session({
      secret: "MyDevShop",
      name: "sessionId"
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use(async (req, res, next) => {
    const categories = await categoryModel.getCategories();
    // Send middleware data forward
    const { user } = req.session;
    res.locals = {
      categories,
      user
    };
    next();
  });

  app.use(routes(db));

  return app;
};

module.exports = init;
