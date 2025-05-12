import { sendMessage } from "./misc.ts";
import { Player } from "./Player.ts";

export type Room = {
  RoomId: number;
  Players: Player[];
  RoomName: string;
  password: string | undefined;
};

export const rooms: Room[] = [];

export function createRoom(roomName: string) {
  if (getRoomByName(roomName)) {
    console.log(`[Room] Room ${roomName} already exists`);
    return undefined;
  }
  const roomId = rooms.length + 1;
  const newRoom: Room = {
    RoomId: roomId,
    Players: [],
    RoomName: roomName,
    password: undefined,
  };
  rooms.push(newRoom);
  console.log(`[Room] Created room: ${roomName} with ID: ${roomId}`);
  console.log(`[Room] Current room count: ${rooms.length}`);
  return newRoom;
}

export function getRoomByName(roomName: string): Room | undefined {
  return rooms.find((room) => room.RoomName === roomName);
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
