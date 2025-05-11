import { getRoomByName, rooms } from "./Room.ts";
export type Player = {
  address: string;
  port: number;
  uuid: string;
  name: string | undefined;
  room: string | undefined;
};

export const players: Player[] = [];

export function getPlayerById(id: string): Player | undefined {
  return players.find((player) => player.uuid === id);
}

export function getPlayerByName(name: string): Player | undefined {
  return players.find((player) => player.name === name);
}

export function joinRoom(
  playerId: string,
  roomName: string,
): Player | undefined {
  const player = getPlayerById(playerId);
  if (!player) {
    console.log(`[Player] Player ${playerId} not found`);
    return undefined;
  }
  const room = rooms.find((room) => room.RoomName === roomName);
  if (!room) {
    console.log(`[Player] Room ${roomName} not found`);
    return undefined;
  }
  player.room = room.RoomName;
  room.Players.push(player);
  const playerName = player.name;
  console.log(`[Player] Player ${playerName} joined room ${roomName}`);
  return player;
}

export function leaveRoom(playerId: string): Player | undefined {
  const player = getPlayerById(playerId);
  const playerName = player?.name;
  if (!player) {
    console.log(`[Player] Player ${playerName} not found`);
    return undefined;
  }
  const room = getRoomByName(player.room || "");
  player.room = undefined;
  if (room) {
    room.Players = room.Players.filter((p) => p.uuid !== player.uuid);
  }
  console.log(`[Player] Player ${playerName} left room ${room?.RoomName}`);
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
