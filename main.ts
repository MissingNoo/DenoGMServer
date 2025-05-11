/// <reference lib="deno.ns" />
import dgram from "node:dgram";
import {
  getPlayerUUIDByAddress,
  joinRoom,
  leaveRoom,
  Player,
  players,
} from "./Player.ts";
import { createRoom, listPlayersInRoom, sendMessageToRoom } from "./Room.ts";
import { randomUUID } from "node:crypto";
import { sendMessage } from "./misc.ts";
export const server = dgram.createSocket("udp4");

server.bind(8080);
server.on("message", (msg, rinfo) => {
  const data = JSON.parse(msg.toString());
  const playerId = getPlayerUUIDByAddress(
    rinfo.address,
    rinfo.port,
  );
  const player = players.find(
    (player) => player.uuid === playerId,
  );
  switch (data.type) {
    case "connect": {
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
          console.log(`[Main] Player tried logging in with uuid ${data.uuid} not found, creating new player`);
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
      break;
    }

    case "newRoom": {
      createRoom(data.roomName);
      break;
    }

    case "joinRoom": {
      const roomName = data.roomName;
      if (playerId) {
        const player = joinRoom(playerId, roomName);
        if (player) {
          sendMessageToRoom(
            player.room,
            "playersInRoom",
            { players: listPlayersInRoom(roomName) },
            player,
            true,
          );
        } else {
          sendMessage(
            "joinRoomFailed",
            {},
            rinfo.address,
            rinfo.port,
          );
        }
      }
      break;
    }

    case "leaveRoom": {
      if (playerId) {
        leaveRoom(playerId);
      } else {
        console.error("[Main] Player ID is undefined, cannot leave room.");
      }
      break;
    }

    case "listPlayersInRoom": {
      const roomName = data.roomName;
      const playersInRoom = listPlayersInRoom(roomName);
      if (playersInRoom) {
        server.send(JSON.stringify(playersInRoom), rinfo.port, rinfo.address);
        console.log(
          `[Main] Players in room ${roomName}: ${
            JSON.stringify(playersInRoom)
          }`,
        );
      } else {
        server.send("Room not found", rinfo.port, rinfo.address);
      }
      break;
    }

    case "ping": {
      sendMessage(
        "pong",
        {},
        rinfo.address,
        rinfo.port,
      );
      //console.log(`[Main] Ping from ${rinfo.address}:${rinfo.port}`);
      break;
    }

    case "movePlayer": {
      if (player) {
        player.x = data.x;
        player.y = data.y;
        sendMessageToRoom(
          player.room,
          "playerMoved",
          { uuid: player.uuid, x: player.x, y: player.y },
          player,
        );
      } else {
        console.error("[Main] Player not found");
      }
      break;
    }

    case "disconnect": {
      if (player) {
        const index = players.indexOf(player);
        if (index > -1) {
          leaveRoom(player.uuid);
          players.splice(index, 1);
          console.log(`[Main] Player ${player.uuid} disconnected`);
        }
      }
      break;
    }

    default:
      break;
  }
});
console.log("[Main] Server is listening on port 8080");
