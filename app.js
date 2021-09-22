const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3000

const app = express(PORT,console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));
