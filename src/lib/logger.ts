import path from "path";
import { createLogger, format, transports } from "winston";
import { config } from "../config.js";

let pathOption: (typeof transports.File)[] = [];

if (config.USE_LOG_FILE) {
  pathOption = [
    new transports.File({
      filename: path.resolve("logs/error.log"),
      level: "error",
      maxsize: 1024 * 1024,
      maxFiles: 1,
    }),
    new transports.File({
      filename: path.resolve("logs/logger.log"),
      maxsize: 1024 * 1024,
      maxFiles: 1,
    }),
  ];
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: pathOption,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export { logger };
