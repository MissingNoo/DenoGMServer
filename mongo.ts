import { MongoClient } from "npm:mongodb";
import { findPlayerByUUID, players } from "./Player.ts";
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
  uuid: string,
  username: string,
  passwordhash: string,
) {
  await playerscol.findOne({ username }).then((res) => {
    if (res?.password == passwordhash) {
      const player = findPlayerByUUID(uuid);
      if (player) {
        player.loggedIn = true;
        sendMessage("login", { username }, player.address, player.port);
        console.log(`[Mongo] ${username} logged in!`);
      }
    }
  });
}
