import { redis } from "./db.ts";
import { FreshContext } from "$fresh/server.ts";

async function totalPlayers() {
  let players: number = -1;
  await redis.get("PlayerList").then((res) => {
    players = res ? res.split(",").length : 0;
  }).catch((err) => {
    console.log(err);
  });
  return players;
}
// deno-lint-ignore no-explicit-any
let players: any = "0";

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const body = players;
  totalPlayers().then((res) => {
    players = res;
  });
  return new Response(body);
};
