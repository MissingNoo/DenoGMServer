import { redis } from "./db.ts";

export function totalPlayers(): number {
  let players: number = -1;
  redis.get("PlayerList").then((res) => {
    players = res ? res.split(",").length : 0;
  }).catch((err) => {
    console.log(err);
  });
  console.log(players);
  return players;
}
