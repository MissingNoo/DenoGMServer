import { createClient } from "redis";
import { MongoClient } from "npm:mongodb";

export const redis = createClient({
  url: "redis://localhost:6379",
});
let rediscon;
try {
  await redis.connect();
  rediscon = true;
} catch (_error) {
  rediscon = false;
}

export const mongo = new MongoClient("mongodb://127.0.0.1:27017");
let mongocon;
try {
  await mongo.connect();
  mongocon = true;
} catch (_error) {
  mongocon = false;
}

import { FreshContext } from "$fresh/server.ts";
export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const dbcon = `Redis: ${rediscon}, Mongo: ${mongocon}`;
  const body = dbcon;
  return new Response(body);
};
