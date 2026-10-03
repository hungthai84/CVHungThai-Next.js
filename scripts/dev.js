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
let port = "3000";
let host = "0.0.0.0";
const extraArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === "--host") {
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      host = rawArgs[i + 1];
      i++;
    }
    continue;
  }
  if (arg.startsWith("--host=")) {
    host = arg.split("=")[1] || host;
    continue;
  }
  if (arg === "-p" || arg === "--port") {
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      port = rawArgs[i + 1];
      i++;
    }
    continue;
  }
  if (arg.startsWith("-p=") || arg.startsWith("--port=")) {
    port = arg.split("=")[1] || port;
    continue;
  }
  if (arg === "-H" || arg === "--hostname") {
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      host = rawArgs[i + 1];
      i++;
    }
    continue;
  }
  if (arg.startsWith("-H=") || arg.startsWith("--hostname=")) {
    host = arg.split("=")[1] || host;
    continue;
  }
  // Ignore unsupported flags that might be passed by Vite-based dev runners
  if (arg === "--open" || arg === "--cors" || arg === "--strictPort") {
    continue;
  }
  extraArgs.push(arg);
}

const nextArgs = ["dev", "-p", port, "-H", host, ...extraArgs];

console.log(`[dev.js] Launching Next.js with args: ${nextArgs.join(" ")}`);

const child = spawn("npx", ["next", ...nextArgs], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

const handleTermination = (signal) => {
  if (child && !child.killed) {
    child.kill(signal);
  }
  process.exit(0);
};

process.on("SIGINT", () => handleTermination("SIGINT"));
process.on("SIGTERM", () => handleTermination("SIGTERM"));

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
