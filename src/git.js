import { execSync } from "child_process";

export function getStagedDiff() {
  try {
    const diff = execSync("git diff --staged", { encoding: "utf-8" });

    if (!diff.trim()) {
      throw new Error("No staged changes found. Use 'git add' first.");
    }

    return diff;
  } catch (err) {
    throw new Error("Failed to read git diff: " + err.message);
  }
}
