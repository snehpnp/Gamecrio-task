const Mongoose = require("mongoose");

Mongoose.connect("mongodb+srv://task:task@cluster0.umf5yjw.mongodb.net/gamecriodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

Mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

Mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = Mongoose;
