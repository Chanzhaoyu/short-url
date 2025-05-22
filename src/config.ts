import dotenv from "dotenv";

dotenv.config();

export type Config = {
  DOMAIN: string;
  PORT: number;
  CACHE_TTL: number;
  ALLOWED_DOMAIN: string;
  SECRET_KEY: string;
  USE_LOG_FILE: boolean;
};

const getEnvVariable = (key: string): string | null => {
  const value = process.env[key];
  if (value === undefined) return null;
  return value;
};

const getNumericEnvVariable = (key: string, defaultValue: number): number => {
  const value = getEnvVariable(key) ?? String(defaultValue);
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) return defaultValue;
  return parsedValue;
};

const getBooleanEnvVariable = (key: string, defaultValue: boolean): boolean => {
  const value = getEnvVariable(key) ?? String(defaultValue);
  return value.toLowerCase() === "true";
};

const runningPort = getNumericEnvVariable("PORT", 9031);

export const config: Config = {
  DOMAIN: getEnvVariable("DOMAIN") || `http://localhost:${runningPort}`,
  PORT: runningPort,
  CACHE_TTL: getNumericEnvVariable("CACHE_TTL", 7200),
  ALLOWED_DOMAIN: getEnvVariable("ALLOWED_DOMAIN") || "*",
  SECRET_KEY: getEnvVariable("SECRET_KEY") || "SECRET_KEY",
  USE_LOG_FILE: getBooleanEnvVariable("USE_LOG_FILE", true),
};
