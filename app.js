const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoDbStore = require("connect-mongo");

dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server runnning in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
