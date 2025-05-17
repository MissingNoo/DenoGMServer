import { MongoClient } from "npm:mongodb";
import { findPlayerByUUID, Player, players } from "./Player.ts";
import { sendMessage } from "./misc.ts";
const mongo = new MongoClient(
  Deno.env.get("mongo") ?? "mongodb://127.0.0.1:27017",
);
try {
  await mongo.connect();
  console.log("[Mongo] Connected!");
} catch (_error) {
  console.error("[Mongo] Can't connect to the DB!");
  Deno.exit();
}

const db = mongo.db(Deno.env.get("mongodb") ?? "AirNetwork");

interface PlayerSchema {
  username: string;
  password: string;
  lastlogin: string;
}

const playerscol = db.collection<PlayerSchema>("Players");

export async function PlayerLogin(
  player : Player,
  username: string,
  passwordhash: string,
) {
  if (player.loggedIn) { return; }
  await playerscol.findOne({ username }).then((res) => {
    console.log(passwordhash);
    if (res?.password == passwordhash) {
      player.loggedIn = true;
      player.name = username;
      sendMessage("login", { username }, player.address, player.port);
      console.log(`[Mongo] Player ${username} logged in!`);
    }
  });
}
