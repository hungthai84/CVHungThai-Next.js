import { spawn } from "child_process";
import fs from "fs";
import path from "path";

// Clean conflicting production build artifacts before starting dev server
// Next.js 16 Turbopack crashes if production BUILD_ID / cache exists in .next
try {
  const nextDir = path.join(process.cwd(), ".next");
  const buildIdFile = path.join(nextDir, "BUILD_ID");
  if (fs.existsSync(buildIdFile)) {
    console.log("[dev.js] Found production build artifacts in .next, cleaning cache to prevent Turbopack collision...");
    const cacheDir = path.join(nextDir, "cache");
    const devDir = path.join(nextDir, "dev");
    if (fs.existsSync(cacheDir)) fs.rmSync(cacheDir, { recursive: true, force: true });
    if (fs.existsSync(devDir)) fs.rmSync(devDir, { recursive: true, force: true });
    fs.rmSync(buildIdFile, { force: true });
  }
} catch (e) {
  // Ignore
}

// Process arguments and translate/remove unsupported flags for Next.js
const rawArgs = process.argv.slice(2);
const nextArgs = ["dev", "-p", "3000", "-H", "0.0.0.0"];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === "--host") {
    // If followed by a hostname value (e.g. --host 0.0.0.0), consume it
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      i++;
    }
    continue;
  }
  if (arg.startsWith("--host=")) {
    continue;
  }
  // Avoid duplicating port or hostname if already specified
  if (arg === "-p" || arg === "--port") {
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      i++;
    }
    continue;
  }
  if (arg.startsWith("-p=") || arg.startsWith("--port=")) {
    continue;
  }
  if (arg === "-H" || arg === "--hostname") {
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("-")) {
      i++;
    }
    continue;
  }
  if (arg.startsWith("-H=") || arg.startsWith("--hostname=")) {
    continue;
  }
  nextArgs.push(arg);
}

const child = spawn("npx", ["next", ...nextArgs], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
