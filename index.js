const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

// set up express server
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://snippetsmanager.netlify.app"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port 5000 ${PORT}`));

// set up routers

app.use("/snippet", require("./routers/snippetRouter"));
app.use("/auth", require("./routers/userRouter"));

// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);
