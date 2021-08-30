const express = require("express");
const cors = require("cors");
const app = express();
const apiRoutes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server started");
});
