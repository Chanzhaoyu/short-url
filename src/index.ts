import { serve } from "@hono/node-server";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";
import app from "./app.js";

console.info("=======================================");
console.info(`= 🔗 Local: 👉 http://localhost:${config.PORT}  =`);
console.info("=======================================");

logger.info(`= 🔥 Short Url 成功在端口 ${config.PORT} 上运行 =`);

const server = serve({
  fetch: app.fetch,
  port: config.PORT,
});

export default server;
