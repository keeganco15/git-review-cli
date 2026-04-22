# git-review-cli

A lightweight CLI tool that reviews staged Git changes using AI and generates concise feedback along with a suggested commit message.

---

## Overview

`git-review-cli` integrates directly into your development workflow. It analyses staged changes (`git diff --staged`) and returns a structured review covering:

* Summary of changes
* Potential risks
* Suggested improvements
* Recommended test cases
* A concise commit message

The tool is designed to be fast, minimal, and immediately usable via `npx` without installation overhead.

This tool demonstrates:

* Practical integration of LLM APIs into developer tooling
* Ability to design and ship a usable CLI product
* Focus on real-world workflows rather than isolated demos

---

## Installation

No global install required:

```bash
npx git-review-cli
```

---

## Usage

### Basic usage

```bash
git add .
npx git-review-cli
```

### Commit message only

```bash
npx git-review-cli --commit
```

---

## Example Output

```
=== SUMMARY ===
- Added validation to input handling
- Refactored utility functions for clarity

=== SUGGESTED COMMIT MESSAGE ===
Add input validation and refactor utilities

=== RISKS ===
- Missing edge case handling for null values

=== IMPROVEMENTS ===
- Add stricter type checks
- Improve function naming

=== TESTS ===
- Test null input handling
- Test boundary values
```

---

## Setup

### 1. Get a Gemini API key

Create an API key via Google AI Studio.

### 2. Configure environment variables

Create a `.env` file in the root:

```
GEMINI_API_KEY=your_api_key_here
```

---

## How It Works

1. Reads staged changes using:

   ```bash
   git diff --staged
   ```
2. Sends the diff to the Gemini API
3. Structures the response into predefined sections
4. Outputs a clean, readable review in the terminal

---

## Project Structure

```
bin/        CLI entry point  
src/        Core logic (git, AI, prompt, formatting)  
```

---

## Design Decisions

* **CLI-first approach**: integrates directly into developer workflows
* **No build step**: plain Node.js for simplicity and fast iteration
* **Scoped AI usage**: focused prompts for predictable output
* **Minimal dependencies**: reduces failure points and improves portability

---

## Limitations

* Large diffs are truncated to maintain performance
* Output quality depends on clarity and size of the staged changes

---

## Roadmap

* Additional CLI flags (e.g. selective sections)
* Improved diff preprocessing
* Optional commit automation
* Output formatting enhancements

---

## License

MIT
