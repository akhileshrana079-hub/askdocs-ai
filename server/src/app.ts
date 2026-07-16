import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);

app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    message: "AskDocs API is running 🚀",
  });
});

export default app;