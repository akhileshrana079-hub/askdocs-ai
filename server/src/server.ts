import app from "./app";
import { env } from "./config/env";
import { createCollection } from "./modules/document/vector/qdrant.service";

const startServer = async () => {
  await createCollection();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
};

startServer();