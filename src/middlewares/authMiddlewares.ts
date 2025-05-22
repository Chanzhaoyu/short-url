import type { Context, Next } from "hono";
import { config } from "../config.js";
import { isNonEmptyString } from "../lib/is.js";

export const protect = async (c: Context, next: Next) => {
  // 检查请求头中是否包含 secret-key，并且 secret-key 的值是否等于 config.SECRET_KEY
  const secretKey = c.req.header("secret-key");
  if (!isNonEmptyString(secretKey) || secretKey !== config.SECRET_KEY) {
    throw new Error("Unauthorized");
  }
  await next();
};
