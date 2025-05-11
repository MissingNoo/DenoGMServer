import { Player } from "./Player.ts";

export type Room = {
  RoomId: number;
  Players: Player[];
  RoomName: string;
};
export const rooms: Room[] = [];
export function createRoom(roomName: string): Room {
  const roomId = rooms.length + 1;
  const newRoom: Room = {
    RoomId: roomId,
    Players: [],
    RoomName: roomName,
  };
  rooms.push(newRoom);
  console.log(`[Room] Created room: ${roomName} with ID: ${roomId}`);
  console.log(`[Room] Current rooms: ${JSON.stringify(rooms)}`);
  console.log(`[Room] Current room count: ${rooms.length}`);
  return newRoom;
}

export function getRoomById(roomId: number): Room | undefined {
  return rooms.find((room) => room.RoomId === roomId);
}

export function getRoomByName(roomName: string): Room | undefined {
  return rooms.find((room) => room.RoomName === roomName);
}

export function listPlayersInRoom(roomName: string): Player[] | undefined {
  const room = getRoomByName(roomName);
  if (!room) {
    console.log(`[Room] Room ${roomName} not found`);
    return undefined;
  }
  return room.Players;
}
