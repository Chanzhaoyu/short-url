import type { Context } from "hono";

export const errorHandler = (c: Context) => {
  return c.json({
    data: null,
    msg: c.error?.message,
    status: "Fail",
  });
};
