import workerData from "node:worker_threads";
let con: any;
let enabled = false;

async function handle_message() {
  const buffer = new Uint8Array(1024);
  try {
    const bytesRead = await con.read(buffer);
    if (bytesRead !== null) {
      console.log(
        "Received:",
        new TextDecoder().decode(buffer.subarray(0, bytesRead)),
      );
      await con.write(new TextEncoder().encode("Hello from Deno!\n"));
    }
  } catch (err) {
    console.error("Connection error:", err);
    con.close();
    enabled = false;
  }
}

self.onmessage = (event) => {
  console.log("[Worker] Received message in player worker:");
  if (event.data.type === "connection") {
    console.log("[Worker] Data");
    console.log(workerData.workerData.con);
    console.log("[Worker] Data End");
    console.log("[Worker] Connection established in player worker, ", con);
  }
  //enabled = true;
  while (enabled) {
    //console.log("Handling message in player worker");
    //handle_message();
  }
};
