const express = require("express");
require("dotenv").config();
const cors= require("cors");


const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

const port = process.env.PORT || 8000;

const app = express();

app.use(cors())
// these are for post/put requests for passing value to server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome To ShishuCare");
});

app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/chw",require("./routes/chwRoutes"));
app.use("/api/patient", require("./routes/patientRoutes"));
app.use("/api/visit", require("./routes/visitRoutes"))
app.use("/api/diagnosis",require("./routes/diagnosisRoutes"));


app.use(errorHandlerMiddleware);

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI).then(() => {console.log("database connected successfully");});
      app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
};

  start();
