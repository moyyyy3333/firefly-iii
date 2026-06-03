# raw/ — immutable source files

This folder is the **single source of truth**. Drop original, unedited
materials here: saved HTML pages, PDFs, plain-text notes, screenshots,
spreadsheets, exported chat logs, etc.

Rules:

- **Never edit files in this folder by hand.** Treat them as read-only.
- The structuring agent reads from here and writes cleaned, structured output
  into `../wiki/`. It never modifies the originals.
- When a source changes, add a **new** file (e.g. with a date suffix) rather
  than overwriting the old one, so history is preserved.

The seed content of this wiki was generated from the model's own knowledge of
Claude and Claude Code (knowledge cutoff: January 2026), so there are no
binary sources committed here yet — add your own.
