import { MongoClient } from "npm:mongodb";
import config from "./config.json" with { type: "json" };
export const mongo = new MongoClient(config.Mongo);
try {
  await mongo.connect();
  console.log("[Mongo] Connected!");
} catch (_error) {
  console.error("[Mongo] Can't connect to the DB!");
  Deno.exit();
}
