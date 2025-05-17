import type { Signal } from "@preact/signals";
import { totalPlayers } from "../routes/api/players.ts";
interface PlayerCountProp {
  count: Signal<number>;
}

export default function OnlineCount(props: PlayerCountProp) {
  return (
    <div>
      online players {totalPlayers()}
    </div>
  );
}
