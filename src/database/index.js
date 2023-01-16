const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jackie098:first-crud-with-mongo@first-crud-with-mongo.eaatydm.mongodb.net/?retryWrites=true&w=majority",
  {},
  (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("connected with successfully");
  }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
