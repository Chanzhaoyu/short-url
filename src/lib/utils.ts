import base62 from "base62";
import { db } from "./db.js";

export function generateRandomStr(len: number) {
  let str = "";
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * 62);
    str += base62.encode(num);
  }
  return str;
}

export async function checkUniqueCode(uniqueCode: string) {
  const url = await db.urls.findUnique({ where: { uniqueCode } });
  if (url) {
    const uniqueCode = generateRandomStr(6);
    checkUniqueCode(uniqueCode);
  } else {
    return uniqueCode;
  }
}
