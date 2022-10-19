import { decode } from "$std/encoding/base64.ts";
import "dotenv/load.ts";
import * as djwt from "djwt/mod.ts";

const encodedKey = Deno.env.get("JWT_CRYPTO_KEY") || "";
const decodedKey = decode(encodedKey);

const key = await crypto.subtle.importKey(
  "raw",
  decodedKey,
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export async function createJwt(src: Object) {
  // アプリケーションが使用したいペイロードに、検証用途に使用するプロパティをマージ
  const assignedObject = Object.assign(src, {
    jti: crypto.randomUUID(),
    exp: djwt.getNumericDate(10), // 確認用なのでトークンの有効期間は10秒
  });
  return await djwt.create({ alg: "HS512", typ: "JWT" }, assignedObject, key);
}

export async function inspectAlgorithm(token: string) {
  // ヘッダー内容が想定通りのものか検証する
  // alg を none にする署名回避を防御しておく
  const [header] = await djwt.decode(token, key);
  return header.alg === "HS512" && header.typ === "JWT";
}

export async function getJwtPayload(token: string) {
  return await djwt.verify(token, key);
}