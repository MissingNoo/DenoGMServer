import moment from "moment";
import { deleteRoom, getRoomByName, rooms, sendMessageToRoom } from "./Room.ts";
import { sendMessage } from "./misc.ts";
import { redis } from "./redis.ts";

export type Player = {
  address: string;
  port: number;
  uuid: string;
  name: string | undefined;
  room: string;
  x: number;
  y: number;
  loggedIn: boolean;
  lastping: moment.Moment;
};

export const players: Player[] = [];

export function joinRoom(
  player: Player,
  roomName: string,
): Player | undefined {
  const room = rooms.find((room) => room.RoomName === roomName);
  if (!room) {
    console.log(`[Player] Room ${roomName} not found`);
    sendMessage(
      "joinRoomFailed",
      { reason: "Room not found" },
      player.address,
      player.port,
    );
    return;
  }
  if (playerInRoom(player)) {
    console.log(`[Player] Player ${player.uuid} already in a room`);
    sendMessage(
      "joinRoomFailed",
      { reason: "Already in a room" },
      player.address,
      player.port,
    );
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
    sendMessageToRoom(
      player.room,
      "playersInRoom",
      { players: room.Players },
      player,
      true,
    );
  }
}

export function leaveRoom(player: Player) {
  const room = getRoomByName(player.room);
  if (room) {
    player.room = "";
    room.Players = room.Players.filter((p) => p.uuid !== player.uuid);
    sendMessageToRoom(
      room.RoomName,
      "playerLeft",
      { uuid: player.uuid },
      player,
      true,
    );
    console.log(`[Player] Player ${player.name} left room ${room.RoomName}`);
    if (room.Players.length === 0) {
      deleteRoom(room.RoomName);
    }
  }
}

function playerInRoom(
  player: Player,
): boolean {
  return player.room !== "";
}

export function listPlayers(): string[] {
  const parr: string[] = [];
  players.forEach((player) => {
    if (player.name != undefined) {
      parr.push(player.name);
    }
  });
  return parr;
}

export function findPlayerByUUID(
  uuid: string,
): Player | undefined {
  return players.find((player) => player.uuid === uuid);
}

export function findPlayerByName(
  username: string,
): Player | undefined {
  return players.find((player) => player.name === username);
}

export function disconnectAfk() {
  const now: moment.Moment = moment(moment.utc());
  players.forEach((element) => {
    if (now.diff(element.lastping) / 60 / 60 > 30) {
      console.log(
        `[Players] ${element.name} last ping was more than 30 seconds ago, disconnecting!`,
      );
      leaveRoom(element);
      disconnectPlayer(element);
    }
  });
}

export function disconnectPlayer(player: Player) {
  leaveRoom(player);
  const index = players.indexOf(player);
  players.splice(index, 1);
  console.log(`[Players] Player ${player.uuid} disconnected`);
  redis.set("PlayerList", listPlayers().toString());
}

