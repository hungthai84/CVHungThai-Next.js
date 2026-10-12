import { spawn } from "child_process";
import fs from "fs";
import path from "path";

// Clean conflicting production build artifacts before starting dev server
// Next.js Turbopack crashes/serves HTML for JS chunks if stale production build artifacts exist in .next
try {
  const nextDir = path.join(process.cwd(), ".next");
  const buildIdFile = path.join(nextDir, "BUILD_ID");
  if (fs.existsSync(buildIdFile)) {
    console.log("[dev.js] Found production build artifacts in .next, removing .next to ensure clean dev compilation...");
    fs.rmSync(nextDir, { recursive: true, force: true });
  }
} catch (e) {
  // Ignore
}

// Process arguments and translate/remove unsupported flags for Next.js
const rawArgs = process.argv.slice(2);
let port = process.env.PORT || "3000";
let host = "0.0.0.0";
const extraArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === "--host" || arg === "-H" || arg === "--hostname") {
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      host = rawArgs[++i];
    }
    continue;
  }
  if (arg.startsWith("--host=") || arg.startsWith("-H=") || arg.startsWith("--hostname=")) {
    host = arg.split("=")[1];
    continue;
  }
  if (arg === "-p" || arg === "--port") {
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      port = rawArgs[++i];
    }
    continue;
  }
  if (arg.startsWith("-p=") || arg.startsWith("--port=")) {
    port = arg.split("=")[1];
    continue;
  }
  extraArgs.push(arg);
}

const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, "dev", "-p", port, "-H", host, ...extraArgs], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));

