import { sendMessage } from "./misc.ts";
import { Player } from "./Player.ts";

export function HandleChatCommand(player: Player, msg: string) {
  const command: string[] = msg.split(" ");
  switch (command[0]) {
    case "/ping":
      sendMessage(
        "chatMessage",
        { player: "[[Server]", message: "Pong" },
        player.address,
        player.port,
      );
      break;

    default:
      console.log(`[Chat] ${command} from ${player.name} was not handled`);
      break;
  }
}
