import worker from "node:worker_threads";
export {};
const addr = ":8080"; // Address and port to listen on

const players:Deno.Conn worker[] = [];
async function handleConnection(conn: Deno.Conn) {
  /*let player = new worker.Worker("./player.ts", {
    workerData: {
      con: conn,
    },
  });
  player.postMessage({ type: "connection", conn });
  connections.push(player);*/
  console.log(conn);  
}

const listener = Deno.listen({ port: 8080 });

console.log(`Listening on ${addr}`);

while (true) {
  console.log("[Main] Waiting for connection");
  const conn = await listener.accept();
  console.log("[Main] Accepted connection");
  handleConnection(conn);
}
