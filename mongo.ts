import { MongoClient } from "npm:mongodb";
export const mongo = new MongoClient(
  Deno.env.get("mongo") ?? "mongodb://127.0.0.1:27017",
);
try {
  await mongo.connect();
  console.log("[Mongo] Connected!");
} catch (_error) {
  console.error("[Mongo] Can't connect to the DB!");
  Deno.exit();
}
