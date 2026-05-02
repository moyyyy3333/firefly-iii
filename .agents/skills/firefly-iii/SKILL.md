```markdown
# firefly-iii Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `firefly-iii` JavaScript codebase. It covers file naming, import/export styles, commit message conventions, and testing patterns. Use this guide to write consistent code, contribute effectively, and run/test your changes with confidence.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.js`, `transactionList.js`

### Import Style
- Use **relative imports** within the codebase.
  - Example:
    ```javascript
    import utils from './utils';
    import apiClient from '../services/apiClient';
    ```

### Export Style
- **Mixed** export style: both default and named exports are used.
  - Example (default export):
    ```javascript
    export default function TransactionList() { ... }
    ```
  - Example (named export):
    ```javascript
    export function calculateBalance() { ... }
    ```

### Commit Message Conventions
- Use **Conventional Commits** with prefixes like `feat` and `fix`.
- Average commit message length: ~51 characters.
  - Example:
    ```
    feat: add new transaction import feature
    fix: correct balance calculation on dashboard
    ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature.
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Write your feature using relative imports for dependencies.
3. Export your module (default or named as appropriate).
4. Add or update relevant test files (`*.test.*`).
5. Commit your changes using the `feat:` prefix.
   - Example: `feat: implement recurring payments`
6. Open a pull request for review.

### Fixing a Bug
**Trigger:** When fixing a bug or issue.
**Command:** `/fix-bug`

1. Locate and edit the relevant file(s).
2. Use relative imports for any new dependencies.
3. Update or add tests in corresponding `*.test.*` files.
4. Commit your changes using the `fix:` prefix.
   - Example: `fix: resolve crash on empty transaction list`
5. Open a pull request for review.

### Running Tests
**Trigger:** To verify code correctness before committing or merging.
**Command:** `/run-tests`

1. Identify test files (pattern: `*.test.*`).
2. Use the project's test runner (framework unknown; check documentation or package scripts).
3. Review test results and fix any failing tests.

## Testing Patterns

- Test files follow the `*.test.*` naming pattern.
  - Example: `transactionList.test.js`
- The testing framework is not specified; check for scripts in `package.json` or project documentation.
- Place test files alongside or near the modules they test.

## Commands
| Command       | Purpose                                      |
|---------------|----------------------------------------------|
| /add-feature  | Steps to add a new feature                   |
| /fix-bug      | Steps to fix a bug                           |
| /run-tests    | Steps to run the test suite                  |
```
