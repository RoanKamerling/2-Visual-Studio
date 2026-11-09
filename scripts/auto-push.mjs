import { watch } from "node:fs";
import { promisify } from "node:util";
import { execFile as execFileCallback } from "node:child_process";
import { fileURLToPath } from "node:url";

const execFile = promisify(execFileCallback);
const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const websiteFiles = ["index.html", "styles.css", "app.js"];
const websiteFileSet = new Set(websiteFiles);
let debounceTimer;
let processing = false;
let pendingChanges = false;

async function git(args) {
  const { stdout } = await execFile("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  });
  return stdout.trim();
}

function schedulePush() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => void commitAndPush(), 1000);
}

async function commitAndPush() {
  if (processing) {
    pendingChanges = true;
    return;
  }

  processing = true;
  try {
    const branch = await git(["branch", "--show-current"]);
    if (branch !== "main") throw new Error(`expected branch main, found ${branch || "detached HEAD"}`);

    const changes = await git(["status", "--porcelain", "--", ...websiteFiles]);
    if (!changes) return;

    await git(["add", "--", ...websiteFiles]);
    const stagedChanges = await git(["diff", "--cached", "--name-only", "--", ...websiteFiles]);
    if (!stagedChanges) return;

    await git(["commit", "--only", "-m", "Auto-push website changes", "--", ...websiteFiles]);
    console.log("Auto-push: websitewijzigingen gecommit; push naar origin/main gestart.");
    await git(["push", "origin", "main"]);
    console.log("Auto-push: websitewijzigingen staan op GitHub.");
  } catch (error) {
    const details = String(error.stderr || error.message).trim().replace(/\s+/g, " ");
    console.error(`Auto-push: error: ${details}`);
  } finally {
    processing = false;
    if (pendingChanges) {
      pendingChanges = false;
      schedulePush();
    }
  }
}

watch(repoRoot, (eventType, filename) => {
  if (!filename || websiteFileSet.has(filename.toString())) schedulePush();
});

console.log(`Auto-push: watching ${websiteFiles.join(", ")} on main.`);