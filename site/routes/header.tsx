import OnlineCount from "../islands/online_counter.tsx";
import { totalPlayers } from "./api/players.ts";

export default function Header() {
  return (
    <div>
      <div class="mx-auto flex max-w-sm items-center"></div>
      <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5">
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </div>
    </div>
  );
}
