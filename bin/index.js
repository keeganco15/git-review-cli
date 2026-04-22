#!/usr/bin/env node

import 'dotenv/config';
import { getStagedDiff } from '../src/git.js';
import { getAiResponse } from '../src/ai.js';
import { parseSections } from '../src/formatter.js';
import { getCommitMessage } from '../src/ai.js';

async function main() {
    try {
        console.log("Reading staged changes...\n");

        const diff = getStagedDiff();

        console.log("Sending diff...\n");

        const response = await getAiResponse(diff);

        const parsed = parseSections(response);

        const commitMessage = await getCommitMessage(diff);

        console.log("=== SUMMARY ===");
        console.log(parsed.summary);

        console.log("\n=== SUGGESTED COMMIT MESSAGE ===");
        console.log(commitMessage);

        console.log("\n=== RISKS ===");
        console.log(parsed.risks);

        console.log("\n=== IMPROVEMENTS ===");
        console.log(parsed.improvements);

        console.log("\n=== TESTS ===");
        console.log(parsed.tests)

    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

main();
