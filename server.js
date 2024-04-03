const express = require("express");
const ConnectDB = require("./config/db");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");

const Tirthankara = require("./routes/Tirthankara");
const Temples = require("./routes/Temples");
const Blogs = require("./routes/Blogs");
const Tonks = require("./routes/Tonks");

const app = express();
ConnectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tirthankar", Tirthankara);
app.use("/temples", Temples);
app.use("/blogs", Blogs);
app.use("/tonks", Tonks);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
