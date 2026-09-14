import { spawn } from "child_process";

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
