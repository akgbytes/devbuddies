import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import errorHandler from "./middlewares/error.middlewares.js";

//routes
import healthCheckRoute from "./routes/healthcheck.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/healthcheck", healthCheckRoute);

// global error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is successfully running on port : ${PORT}`);
});
