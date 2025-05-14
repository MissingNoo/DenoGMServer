import { randomUUID } from "node:crypto";
import { sendMessage } from "./misc.ts";
import { Player } from "./Player.ts";

export type Room = {
  RoomId: number;
  Players: Player[];
  RoomName: string;
  password: string | undefined;
  maxPlayers : number;
  type : string;
  code : string
};

export let rooms: Room[] = [];

export function createRoom(roomName: string, password: string, maxPlayers:number, type : string) {
  if (getRoomByName(roomName)) {
    console.log(`[Room] Room ${roomName} already exists`);
    return undefined;
  }
  const roomId = rooms.length + 1;
  const newRoom: Room = {
    RoomId: roomId,
    Players: [],
    RoomName: roomName,
    password: password,
    maxPlayers : maxPlayers,
    code : randomUUID().split("-")[0],
    type : type
  };
  rooms.push(newRoom);
  console.log(`[Room] Created room: ${roomName} with ID: ${roomId} and code: ${newRoom.code} with max ${maxPlayers} players`);
  console.log(`[Room] Current room count: ${rooms.length}`);
  return newRoom;
}

export function deleteRoom(roomName: string) {
  const room = getRoomByName(roomName);
  if (room) {
    rooms = rooms.filter((r) => r !== room);
    console.log(`[Room] Deleted room: ${room.RoomName}`);
    console.log(`[Room] Current room count: ${rooms.length}`);
  }
}

type roominfo = {
  name : string,
  players : number,
  maxPlayers : number,
  type : string
}

export function getRoomList() {
  const roomlist:roominfo[] = [];
  rooms.forEach(element => {
    const r:roominfo = {
      name : element.RoomName,
      players : element.Players.length,
      maxPlayers : element.maxPlayers,
      type : element.type
    }
    roomlist.push(r);
  });
  return roomlist;
}

export function getRoomByName(roomName: string): Room | undefined {
  return rooms.find((room) => room.RoomName === roomName);
}

export function getRoomByCode(roomCode: string): Room | undefined {
  return rooms.find((room) => room.code === roomCode);
}

export function sendMessageToRoom(
  roomName: string,
  type: string,
  message: unknown,
  owner: Player,
  sendToOwner: boolean = false,
): void {
  const room = getRoomByName(roomName);
  if (!room) {
    console.log(`[Room] Room ${roomName} not found`);
    return;
  }
  room.Players.forEach((player) => {
    if (player.uuid === owner.uuid && !sendToOwner) {
      return;
    }
    sendMessage(type, message, player.address, player.port);
  });
}

export function listPlayersInRoom(roomName: string): Player[] | undefined {
  const room = getRoomByName(roomName);
  if (!room) {
    console.log(`[Room] Room ${roomName} not found`);
    return undefined;
  }
  return room.Players;
}
