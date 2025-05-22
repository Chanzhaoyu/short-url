import type { Urls } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { config } from "../config.js";
import { db } from "../lib/db.js";
import { logger } from "../lib/logger.js";
import { isNonEmptyString } from "../lib/is.js";
import { generateRandomStr, checkUniqueCode } from "../lib/utils.js";
import { getCache, setCache, delCache } from "../lib/cache.js";
import { omit } from "../lib/omit.js";
import { protect } from "../middlewares/authMiddlewares.js";

const urlRoute = new Hono();

/**
 * 获取所有短链
 */
urlRoute.get("/api/url/page", protect, async (c) => {
  const { q = "", limit = 10, offset = 1 } = c.req.query();
  try {
    const where = q ? { OR: [{ url: { contains: q } }, { shortUrl: { contains: q } }] } : {};
    const total = await db.urls.count({ where });
    const data = await db.urls.findMany({
      where,
      take: +limit,
      skip: (+offset - 1) * +limit,
      orderBy: { createdAt: "desc" },
    });
    const pickData = data.map((item) => omit(item, ["isDelete"]));
    return c.json({ data: pickData, count: total, msg: "操作成功", status: "Success" });
  } catch (error) {
    throw new Error(error.message ?? "Internal Server Error");
  }
});

/**
 * 获取短链信息
 */
urlRoute.get("/api/url/:uniqueCode", protect, async (c) => {
  try {
    const { uniqueCode } = c.req.param();
    const data = await db.urls.findUnique({ where: { uniqueCode } });
    if (!data) {
      logger.error(`Short Url API: ${uniqueCode} not found`);
      throw new HTTPException(404, { message: "Short Url not found" });
    }
    const pickData = omit(data, ["isDelete"]);
    return c.json({ data: pickData, msg: "操作成功", status: "Success" });
  } catch (error) {
    throw new Error(error.message ?? "Internal Server Error");
  }
});

/**
 * 生成短链
 */
urlRoute.post("/api/url/shorten", protect, async (c) => {
  try {
    const { url, remark = "", extendsStr = "" } = await c.req.json();
    // 检查 URL 不存在或为非空字符串
    if (!isNonEmptyString(url)) throw new HTTPException(400, { message: "Invalid URL" });
    // 生成随机字符串
    let uniqueCode = generateRandomStr(6);
    // 检查是否存在重复的短链接
    uniqueCode = await checkUniqueCode(uniqueCode);
    // 将 URL 与短链接保存到数据库
    const shortUrl = `${config.DOMAIN}/${uniqueCode}`;
    const data = await db.urls.create({ data: { url, uniqueCode, shortUrl, remark, extendsStr } });
    // 将数据写入缓存
    setCache<Urls>(uniqueCode, { ...data });
    // 记录日志
    logger.info(`生成短链： ${shortUrl} => ${data.url} created`);
    // 返回数据
    const pickData = omit(data, ["isDelete"]);
    return c.json({ data: pickData, msg: "生成成功", status: "Success" });
  } catch (error) {
    throw new Error(error.message ?? "Internal Server Error");
  }
});

/**
 * 删除短链
 */
urlRoute.delete("/api/url/:uniqueCode", protect, async (c) => {
  try {
    const { uniqueCode } = c.req.param();
    const data = await db.urls.findUnique({ where: { uniqueCode } });
    if (!data) {
      throw new HTTPException(404, { message: "uniqueCode not found" });
    }
    await db.urls.delete({ where: { uniqueCode } });
    const cacheData = getCache<Urls>(uniqueCode);
    // 如果缓存中存在数据，则删除缓存
    if (cacheData) delCache(uniqueCode);
    logger.info(`删除短链：${data.shortUrl} => ${data.url}`);
    return c.json({ data: null, msg: "删除成功", status: "Success" });
  } catch (error) {
    throw new Error(error.message ?? "Internal Server Error");
  }
});

export default urlRoute;
