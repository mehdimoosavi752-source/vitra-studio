const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { startServer } = require("./server");

startServer({ dataDir: path.join(__dirname, "data") })
  .then(({ port, localIp, server, dbFile }) => {
    const localUrl = `http://127.0.0.1:${port}`;
    const networkUrl = `http://${localIp}:${port}`;
    fs.writeFileSync(
      path.join(__dirname, "SERVER_ADDRESS.txt"),
      `This computer: ${localUrl}\r\nOther devices: ${networkUrl}\r\nDatabase: ${dbFile}\r\n`,
      "utf8"
    );
    console.log("");
    console.log("TOEFL Allameh central server is ready.");
    console.log(`This computer: ${localUrl}`);
    console.log(`Other devices: ${networkUrl}`);
    console.log(`Database: ${dbFile}`);
    console.log("");
    console.log("Keep this window open during the exam. Press Ctrl+C to stop.");
    spawn("cmd", ["/c", "start", "", localUrl], { detached: true, stdio: "ignore", windowsHide: true }).unref();
    const close = () => server.close(() => process.exit(0));
    process.on("SIGINT", close);
    process.on("SIGTERM", close);
  })
  .catch((err) => {
    console.error("Server could not start:", err.message || err);
    console.error("");
    console.error("Try running START_TOEFL_SERVER.bat again, or restart Windows if the port is locked.");
    process.exit(1);
  });
