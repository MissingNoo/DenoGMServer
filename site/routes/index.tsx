import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Header from "./header.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { redis } from "./api/db.ts";
redis.set("PlayerList", "123,Air,abc");
const resp = async () => {
  if (IS_BROWSER) {
    const resp = await fetch("/api/players");
    const json = await resp.json();
    console.log(json);
  }
};
export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <Header></Header>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}
