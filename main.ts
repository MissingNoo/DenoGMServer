/// <reference lib="deno.ns" />
import dgram from "node:dgram";
import { joinRoom, leaveRoom, Player, players } from "./Player.ts";
import { createRoom, getRoomList, sendMessageToRoom } from "./Room.ts";
import { randomUUID } from "node:crypto";
import { sendMessage } from "./misc.ts";
export const server = dgram.createSocket("udp4");
const PORT = 36692;
server.bind(PORT);
server.on("message", (msg, rinfo) => {
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
      name: undefined,
      room: "",
      address: rinfo.address,
      port: rinfo.port,
      x: 0,
      y: 0,
    };
    players.push(p);
    sendMessage("uuid", { uuid: gen_uuid }, rinfo.address, rinfo.port);
    console.log(`[Main] Player ${gen_uuid} connected`);
  }
  // If the player is already connected, handle the message
  if (player) {
    switch (data.type) {
      case "newRoom": {
        const room = createRoom(data.roomName);
        if (room) {
          sendMessage(
            "roomCreated",
            { roomName: data.roomName },
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
        leaveRoom(player);
        const index = players.indexOf(player);
        players.splice(index, 1);
        console.log(`[Main] Player ${player.uuid} disconnected`);
        break;
      }

      case "getRoomList":
        sendMessage(
          "roomList", 
          {
            roomList : getRoomList(),
          },
          rinfo.address,
          rinfo.port
        );
        break;

      default:
        break;
    }
  }
});
console.log(`[Main] Server is listening on port ${PORT}`);
