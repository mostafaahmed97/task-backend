const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./database");
const app = express();
const apiRoutes = require("./routes");

app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

async function init() {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();
