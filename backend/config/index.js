require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  JSON_SERVER_URL: process.env.JSON_SERVER_URL || "http://localhost:5001",
};
