import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import authRouter from "./src/routes/auth.routes";
const { PORT } = config;
const app = express();
app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(`/api`, authRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
