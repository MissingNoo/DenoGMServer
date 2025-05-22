import { MongoClient } from "npm:mongodb";
import { findPlayerByName, Player } from "./Player.ts";
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
  friends: Array<string>;
}

const playerscol = db.collection<PlayerSchema>("Players");

export async function PlayerLogin(
  player: Player,
  username: string,
  passwordhash: string,
) {
  if (player.loggedIn) return;
  if (findPlayerByName(username)) {
    sendMessage("alreadyConnected", {}, player.address, player.port);
    console.log(`[Mongo] Player ${username} already connected!`);
    return;
  }
  await playerscol.findOne({ username }).then((res) => {
    if (res?.password == passwordhash) {
      player.loggedIn = true;
      player.name = username;
      sendMessage("login", { username }, player.address, player.port);
      console.log(`[Mongo] Player ${username} logged in!`);
    }
  });
}

export async function RegisterPlayer(
  player: Player,
  username: string,
  passwordhash: string,
) {
  const exists = await playerscol.findOne({ username });
  if (exists == null) {
    playerscol.insertOne({
      username: username,
      password: passwordhash,
      lastlogin: "never",
      friends: [],
    });
    console.log(`[Mongo] Player ${username} registered!`);
    PlayerLogin(player, username, passwordhash);
  } else {
    sendMessage("username_exists", {}, player.address, player.port);
  }
}

export async function addFriend(player: Player, otherplayer: string) {
  if (!player.loggedIn) {
    return undefined;
  }
  let player1friends: Array<string | undefined> | undefined = [];
  await playerscol.findOne({ username: player.name }).then(
    (res) => {
      player1friends = res?.friends ?? [];
    },
  );

  let player2friends: Array<string | undefined> | undefined = [];
  await playerscol.findOne({ username: otherplayer }).then(
    (res) => {
      player2friends = res?.friends ?? [];
    },
  );

  player1friends.push(otherplayer);
  // deno-lint-ignore no-explicit-any
  let update: any = {
    $set: {
      friends: player1friends,
    },
  };
  await playerscol.updateOne({ username: player.name }, update);

  player2friends.push(player.name);
  update = {
    $set: {
      friends: player2friends,
    },
  };
  await playerscol.updateOne({ username: otherplayer }, update);

  sendMessage(
    "friendlist",
    { friends: player1friends },
    player.address,
    player.port,
  );
  const player2 = findPlayerByName(otherplayer);
  if (player2) {
    sendMessage(
      "friendlist",
      { friends: player2friends },
      player2.address,
      player2.port,
    );
  }
}

export async function getFriendList(player: Player) {
  if (!player.loggedIn) {
    return undefined;
  }
  let friends: Array<string | undefined> | undefined = [];
  await playerscol.findOne({ username: player.name }).then(
    (res) => {
      friends = res?.friends ?? [];
    },
  );
  sendMessage(
    "friendlist",
    { friends: friends },
    player.address,
    player.port,
  );
}
