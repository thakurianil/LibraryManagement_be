import express from "express";
import cors from "cors";
import { config } from "./src/config/config.js";
import { connectMongoDB } from "./src/config/mongoConfig.js";
import userRouter from "./src/routes/userRouter.js";
import bookRouter from "./src/routes/bookRouter.js";
import borrowRouter from "./src/routes/borrowRouter.js";
import reviewRouter from "./src/routes/reviewRouter.js";
import path from "path";

// Express
const app = express();
const PORT = config.port;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/assets", express.static("assets"));

// user api
app.use("/api/v1/users", userRouter);
// book management api
app.use("/api/v1/books", bookRouter);
// student routes
app.use("/api/v1/students", () => {
  console.log("STUDENT ROUTE");
});

// borrow routes
app.use("/api/v1/borrow", borrowRouter);

// review routes
app.use("/api/v1/reviews", reviewRouter);

// default response
app.get("/", (req, res) => {
  res.json({
    message: "server is live",
  });
});

app.get("/api-health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error.message, "=======");

  res.status(error.status || 500);
  res.json({
    status: "error",
    message: error.message,
  });
});

connectMongoDB()
  .then(() => {
    console.log("Connected to DB: ", config.mongodb.url);
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`server is runing at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to Database");
  });
