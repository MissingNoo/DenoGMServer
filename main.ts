/// <reference lib="deno.ns" />
import dgram from "node:dgram";
import { joinRoom, leaveRoom, Player, players } from "./Player.ts";
import { createRoom, listPlayersInRoom } from "./Room.ts";
import { randomUUID } from "node:crypto";
const server = dgram.createSocket("udp4");

server.bind(8080);
server.on("message", (msg, rinfo) => {
  const data = JSON.parse(msg.toString());
  const playerId = data.uuid;
  switch (data.type) {
    case "connect": {
      const gen_uuid = randomUUID();
      const p: Player = {
        uuid: gen_uuid,
        name: undefined,
        room: undefined,
        address: rinfo.address,
        port: rinfo.port        
      };
      players.push(p);
      server.send(JSON.stringify({type : "uuid", uuid : gen_uuid}), rinfo.port, rinfo.address);
      console.log(players);
      break;
    }

    case "newRoom": {
      const roomName = data.roomName;
      createRoom(roomName);
      break;
    }

    case "joinRoom": {
      const roomName = data.roomName;
      const player = joinRoom(playerId, roomName);
      if (player) {
        server.send(JSON.stringify(player), rinfo.port, rinfo.address);
      } else {
        server.send("Player or room not found", rinfo.port, rinfo.address);
      }
      break;
    }
    case "leaveRoom": {
      leaveRoom(playerId);
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
      server.send(JSON.stringify({type : "pong"}), rinfo.port, rinfo.address);
      console.log(`[Main] Ping from ${rinfo.address}:${rinfo.port}`);
      break;
    }

    default:
      break;
  }
});
console.log("[Main] Server is listening on port 8080");
