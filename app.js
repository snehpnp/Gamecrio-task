const express = require("express");
require("./App/Connections/Connection");

const app = express();
const port = 7700;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", require("./App/Routes/User.route"));
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("event_name", (data) => {});

  socket.emit("event_name", {
    message: "Hello World",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
