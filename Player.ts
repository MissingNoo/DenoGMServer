import {
  getRoomByName,
  playerInRoom,
  rooms,
  sendMessageToRoom,
} from "./Room.ts";
import { sendMessage } from "./misc.ts";
export type Player = {
  address: string;
  port: number;
  uuid: string;
  name: string | undefined;
  room: string;
  x: number;
  y: number;
};

export const players: Player[] = [];

export function getPlayerById(id: string): Player | undefined {
  return players.find((player) => player.uuid === id);
}

export function getPlayerUUIDByAddress(
  address: string,
  port: number,
): string | undefined {
  return players.find(
    (player) => player.address === address && player.port === port,
  )?.uuid || undefined;
}

export function joinRoom(
  playerId: string,
  roomName: string,
): Player | undefined {
  const player = getPlayerById(playerId);
  const room = rooms.find((room) => room.RoomName === roomName);
  if (!player) {
    console.log(`[Player] Player ${playerId} not found`);
    return undefined;
  }  
  if (!room) {
    console.log(`[Player] Room ${roomName} not found`);
    return undefined;
  }
  if (playerInRoom(playerId)) {
    console.log(`[Player] Player ${playerId} already in a room`);
  } else {
    player.room = room.RoomName;
    room.Players.push(player);
    console.log(`[Player] Player ${player.name} joined room ${roomName}`);
    sendMessage(
      "joinedRoom",
      { roomName: roomName },
      player.address,
      player.port,
    );
  }
  return player;
}

export function leaveRoom(playerId: string): Player | undefined {
  const player = getPlayerById(playerId);
  if (!player) {
    return undefined;
  }
  const room = getRoomByName(player.room);
  if (room) {
    player.room = "";
    room.Players = room.Players.filter((p) => p.uuid !== player.uuid);
    sendMessageToRoom(
      room.RoomName,
      "playerLeft",
      { uuid: player.uuid, players: JSON.stringify(room.Players) },
      player,
      true,
    );
    console.log(`[Player] Player ${player.name} left room ${room.RoomName}`);
  }
  
  return player;
}

export function getPlayerRoom(playerId: string): string | undefined {
  const player = getPlayerById(playerId);
  if (!player) {
    console.log(`[Player] Player ${playerId} not found`);
    return undefined;
  }
  return player.room;
}
