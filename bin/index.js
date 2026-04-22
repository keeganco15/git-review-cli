#!/usr/bin/env node

import 'dotenv/config';
import { getStagedDiff } from '../src/git.js';
import { getAiResponse } from '../src/ai.js';

async function main() {
  try {
    console.log("Reading staged changes...\n");

    const diff = getStagedDiff();

    console.log("Sending diff...\n");

    const response = await getAiResponse(diff);

    console.log("=== CHANGES REVIEW ===\n");
    console.log(response);

  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
