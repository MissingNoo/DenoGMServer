import type { Signal } from "@preact/signals";

interface PlayerCountProp {
  count: Signal<number>;
}

export default function OnlineCount(props: PlayerCountProp) {
  return (
    <div>
      online players
    </div>
  );
}
