const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://eranblank533:SvrwpRJTGk07tj81@cluster0.ujithni.mongodb.net/email-system",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userRoutes = require("./routes/users");
const emailRoutes = require("./routes/emails");
app.use("/api/users", userRoutes);
app.use("/api/emails", emailRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
