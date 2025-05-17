import { createClient } from "redis";
// make a connection to the local instance of redis
export const redis = createClient({
    url: "redis://localhost:6379",
});
try {
    await redis.connect();
    console.log("[Redis] Connected!");
} catch (_error) {
    console.error("[Redis] Can't connect to the DB!");
    Deno.exit();
}