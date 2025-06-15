//import { useSignal } from "@preact/signals";
//import Counter from "../islands/Counter.tsx";
//import { IS_BROWSER } from "$fresh/runtime.ts";
import Header from "./header.tsx";
import OnlineCount from "../islands/online_counter.tsx";
import { redis } from "./api/db.ts";
redis.set("PlayerList", "123,Air,abc,123123,1123123,124124,123123");
export default function Home() {
  //const count = useSignal(3);
  return (
    <div class="grid min-h-screen grid-cols-[1fr_2.5rem_auto_auto_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white">
      <div class="col-start-3 row-start-1 flex max-w-lg flex-col bg-gray-100 p-2 dark:bg-white/10">
        <Header></Header>
      </div>
      <div class="col-start-4 row-start-1 flex max-w-lg flex-col bg-gray-100 p-2 dark:bg-white/10">
        <OnlineCount></OnlineCount>
      </div>
    </div>
  );
}
