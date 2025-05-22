import { IS_BROWSER } from "$fresh/runtime.ts";
let totalplayers: number = 0;
const getPlayers = async () => {
  if (IS_BROWSER) {
    const resp = await fetch("/api/players");
    const result = await resp.text();
    totalplayers = Number.parseInt(result);
  }
};
await getPlayers();
export default function OnlineCount() {
  return (
    <div class="rounded-xl flex shadow-lg outline bg-blue-700 p-6 gap-x-1 border-b-2 border-b-red-500">
      <div>
        Online Players:
      </div>
      <div>
        {totalplayers}
      </div>
    </div>
  );
}
