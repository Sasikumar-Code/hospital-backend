const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cors = require('cors');
const patientRoutes = require("./routes/patientRoutes");

const dbConfig = require("./db");

app.use(cors());
app.use(express.json());
app.use("/", userRoutes);

app.use("/", patientRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Node server started using nodemon in 3001"));