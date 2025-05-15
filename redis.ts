import { createClient } from "redis";
// make a connection to the local instance of redis
export const redis = createClient({
    url: "redis://localhost:6379",
});

await redis.connect();

export async function set(k:string, v:string) {
    await redis.set(k, v);
    console.log(await redis.get("devilbox-version"));
}