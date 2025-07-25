/// <reference lib="deno.ns" />
import "jsr:@std/dotenv/load";
import dgram from "node:dgram";
import moment from "moment";
import {
  disconnectAfk,
  disconnectPlayer,
  findPlayerByName,
  joinRoom,
  leaveRoom,
  listPlayers,
  Player,
  players,
} from "./Player.ts";
import {
  createRoom,
  getRoomByCode,
  getRoomList,
  sendMessageToRoom,
} from "./Room.ts";
import { randomUUID } from "node:crypto";
import { sendMessage } from "./misc.ts";
import { redis } from "./redis.ts";
import {
  addFriend,
  getFriendList,
  PlayerLogin,
  RegisterPlayer,
} from "./mongo.ts";
import { HandleChatCommand } from "./chat.ts";
export const server = dgram.createSocket("udp4");
redis.set("PlayerList", listPlayers().toString());
const PORT = 36692;
server.bind(PORT);

// deno-lint-ignore no-explicit-any
server.on("message", (msg: any, rinfo: any) => {
  disconnectAfk();
  const data = JSON.parse(msg.toString());
  const player = players.find(
    (player) => player.address === rinfo.address && player.port === rinfo.port,
  );
  // If the player is not connected, handle the connection
  if (data.type === "connect") {
    if (data.uuid !== "") {
      const existingPlayer = players.find(
        (player) => player.uuid === data.uuid,
      );
      if (existingPlayer) {
        existingPlayer.address = rinfo.address;
        existingPlayer.port = rinfo.port;
        console.log(`[Main] Player ${data.uuid} reconnected`);
        return;
      } else {
        console.log(
          `[Main] Player tried logging in with uuid ${data.uuid} not found, creating new player`,
        );
      }
    }
    const gen_uuid = randomUUID();
    const p: Player = {
      uuid: gen_uuid,
      name: gen_uuid,
      room: "",
      address: rinfo.address,
      port: rinfo.port,
      x: 0,
      y: 0,
      loggedIn: false,
      lastping: moment(moment.now()),
    };
    players.push(p);
    redis.set("PlayerList", listPlayers().toString());
    sendMessage("uuid", { uuid: gen_uuid }, rinfo.address, rinfo.port);
    console.log(`[Main] Player ${gen_uuid} connected`);
  }
  // If the player is already connected, handle the message
  if (player) {
    switch (data.type) {
      case "login": {
        PlayerLogin(player, data.username, data.passwordhash);
        break;
      }
      case "register": {
        RegisterPlayer(player, data.username, data.passwordhash);
        break;
      }
      case "newRoom": {
        const room = createRoom(
          data.roomName,
          data.password,
          data.maxPlayers,
          data.roomType,
        );
        if (room) {
          sendMessage(
            "roomCreated",
            { roomName: data.roomName, roomCode: room.code },
            rinfo.address,
            rinfo.port,
          );
        }
        break;
      }

      case "joinRoom": {
        joinRoom(player, data.roomName);
        break;
      }

      case "joinCode": {
        const rname = getRoomByCode(data.roomCode);
        console.log(data.roomCode);
        if (rname) {
          joinRoom(player, rname.RoomName);
        }
        break;
      }

      case "leaveRoom": {
        leaveRoom(player);
        break;
      }

      case "ping": {
        sendMessage(
          "pong",
          {},
          rinfo.address,
          rinfo.port,
        );
        player.lastping = moment(moment.utc());
        break;
      }

      case "movePlayer": {
        player.x = data.x;
        player.y = data.y;
        sendMessageToRoom(
          player.room,
          "playerMoved",
          { uuid: player.uuid, x: player.x, y: player.y },
          player,
        );
        break;
      }

      case "disconnect": {
        disconnectPlayer(player);
        break;
      }

      case "getRoomList":
        sendMessage(
          "roomList",
          {
            roomList: getRoomList(),
          },
          rinfo.address,
          rinfo.port,
        );
        break;

      case "chatMessage": {
        const msg: string = data.message;
        if (msg.charAt(0) == "/") {
          HandleChatCommand(player, msg);
        } else {
          sendMessageToRoom(
            player.room,
            "chatMessage",
            { player: data.player, message: data.message },
            player,
            true,
          );
        }
        break;
      }

      case "addFriend": {
        const friend = findPlayerByName(data.player);
        if (friend) {
          sendMessage(
            "addFriend",
            { from: player.name },
            friend.address,
            friend.port,
          );
          console.log(`${player.name} sent a friend request to ${friend.name}`);
        }
        break;
      }

      case "acceptFriend": {
        addFriend(player, data.player);
        break;
      }

      case "getFriendList": {
        getFriendList(player);
        break;
      }

      default:
        console.log(`[Main] unhandled ${data.type}`);
        break;
    }
  }
});
console.log(`[Main] Server is listening on port ${PORT}`);
