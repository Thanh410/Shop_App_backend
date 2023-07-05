const mongoose = require("mongoose");
require("dotenv").config();

async function Connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect Succesfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { Connect };
