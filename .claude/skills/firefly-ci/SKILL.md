---
name: firefly-ci
description: Run the Firefly III (app/) PHP CI checks — php-cs-fixer, PHPStan, PHPMD, and Rector — the same way .ci/ and GitHub Actions run them, then summarize failures with file:line pointers. Use when asked to lint, run static analysis, check CI, or verify PHP changes before pushing in the Firefly III Laravel app.
---

# Firefly III CI

Runs the same checks that live in `.ci/` and the GitHub Actions pipeline, then
reports results so you can fix them before pushing. All commands run from the
repository root.

## Important: which checks modify files

| Check | Script | Modifies files? | Notes |
|---|---|---|---|
| php-cs-fixer | `.ci/phpcs.sh` | **YES — applies fixes** | Rewrites code to match style. Review the diff after. |
| PHPStan | `.ci/phpstan.sh` | No (read-only) | Writes report to `phpstan-report.txt`. |
| PHPMD | `.ci/phpmd.sh` | No (read-only) | Mess detector over app/database/routes/config. |
| Rector | `.ci/rector.sh --dry-run` | No in `--dry-run` | Without `--dry-run` it **applies** refactors. |

Because `phpcs.sh` and a bare `rector.sh` change source files, prefer the
read-only checks first, and only run the fixers when the user explicitly wants
code rewritten. After any fixer, show `git diff` and let the user review.

## Workflow

1. **Confirm scope.** These checks target the Firefly III Laravel app at the
   repo root (`app/`, `database/`, `routes/`, `config/`). They do not apply to
   `filter-removal-app/`, `filter-removal-web/`, or `neo/`.

2. **Ensure dependencies exist.** The analysis tools live under `vendor/`. If
   `vendor/bin/phpstan` is missing, run `composer install --no-interaction` (or
   tell the user to), since the scripts assume an installed tree.

3. **Run the read-only checks** (safe default):
   ```bash
   ./vendor/bin/phpstan analyse -c .ci/phpstan.neon --error-format=table > phpstan-report.txt; echo "exit=$?"
   .ci/phpmd.sh
   .ci/rector.sh --dry-run
   ```
   Or run everything the CI runs (note: `all.sh` invokes the **fixer** via
   `phpcs.sh`):
   ```bash
   .ci/all.sh
   ```

4. **Summarize results.** For each check report pass/fail and the exit code.
   For failures, surface the offending `path/to/File.php:line` and the rule, and
   group by file. Read `phpstan-report.txt` for the PHPStan details. Don't dump
   the full raw output unless asked — give the actionable list.

5. **If asked to fix:**
   - Style only: `.ci/phpcs.sh`, then `git diff` for review.
   - Rector refactors: `.ci/rector.sh` (no `--dry-run`), then `git diff`.
   - For PHPStan/PHPMD findings, fix them in code by hand and re-run the
     relevant check to confirm it's clean.

## Notes

- Config lives in `.ci/phpstan.neon`, `.ci/rector.php`, `.ci/phpmd/phpmd.xml`,
  and `.ci/php-cs-fixer/.php-cs-fixer.php`. Don't edit these to make checks pass.
- The scripts honor `$GITHUB_ACTIONS`; locally they use human-readable output
  formats, which is what you want here.
