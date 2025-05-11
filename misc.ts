import { server } from "./main.ts";

export function sendMessage(
  type: string,
  // deno-lint-ignore no-explicit-any
  message: any,
  address: string,
  port: number,
): void {
  const data = {
    type: type,
    message: JSON.stringify(message),
  };
  server.send(JSON.stringify(data), port, address, (err) => {
    if (err) {
      console.error(`Error sending message: ${err}`);
    } else {
      //console.log(`Message sent to ${address}:${port}`);
    }
  });
}
