import type { Urls } from "@prisma/client";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { serveStatic } from "@hono/node-server/serve-static";
import { errorHandler } from "./middlewares/errorMiddlewares.js";
import { config } from "./config.js";
import { db } from "./lib/db.js";
import { logger } from "./lib/logger.js";
import { getCache, setCache } from "./lib/cache.js";
import urlRoute from "./routes/url.js";

import Home from "./views/Home.js";
import NotFound from "./views/NotFound.js";

const app = new Hono();

// 压缩请求
app.use(compress());

// 跨域
app.use(
  "*",
  cors({
    origin: config.ALLOWED_DOMAIN,
    allowMethods: ["POST", "GET", "OPTIONS"],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    credentials: true,
  }),
);

// 静态文件服务
app.use(
  "/*",
  serveStatic({
    root: "./public",
    rewriteRequestPath: (path) => (path === "/favicon.ico" ? "/favicon.png" : path),
  }),
);

// 首页
app.get("/", (c) => c.html(<Home />));

/**
 * 访问短链接
 */
app.get("/:uniqueCode", async (c) => {
  try {
    const { uniqueCode } = c.req.param();
    // 从缓存中提取数据
    const cacheData = getCache<Urls>(uniqueCode);
    if (cacheData) {
      logger.info(`访问短链（缓存）：${cacheData.shortUrl} => ${cacheData.url}`);
      return c.redirect(cacheData.url, 302);
    }
    // 从数据库中提取数据
    const url = await db.urls.findUnique({ where: { uniqueCode } });
    if (!url) {
      logger.error(`Short Url ${uniqueCode} not found`);
      return c.html(<NotFound />, 404);
    }
    // 将数据写入缓存
    setCache<Urls>(uniqueCode, { ...url });
    logger.info(`访问短链：${url.shortUrl} => ${url.url}`);
    return c.redirect(url.url, 302);
  } catch (error) {
    throw new Error(error.message ?? "Internal Server Error");
  }
});

app.route("/", urlRoute);

app.notFound((c) => c.html(<NotFound />, 404));

app.onError((_, c) => errorHandler(c));

export default app;
