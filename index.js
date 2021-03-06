const user = require("./models/user");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "ph",
    password: "toor",
    database: "devshop"
  }
});

// Debug requested queries
db.on("query", query => {
  console.log(`SQL:\t${query.sql}`);
});

const app = require("./app")(db);
const port = process.env.PORT || 3000;

user.initialUser(db)();

app.listen(port, err => {
  if (err) console.log(err);
  else console.log(`Running on ${port}`);
});
