import config from "./config.json" with { type: "json" };
import { createClient } from "redis";
// make a connection to the local instance of redis
export const redis = createClient({
  url: config.Redis,
});
try {
  await redis.connect();
  console.log("[Redis] Connected!");
} catch (_error) {
  console.error("[Redis] Can't connect to the DB!");
  Deno.exit();
}
