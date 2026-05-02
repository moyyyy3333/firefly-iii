#!/usr/bin/env node
/**
 * Generates placeholder PNG assets for the NEO app.
 * Run automatically via `postinstall` or manually: node scripts/setup-assets.js
 *
 * For production, replace these with proper 1024x1024 branded icons.
 */

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Minimal valid 1x1 blue PNG (placeholder)
// A real 1024x1024 icon should replace this before publishing
const PLACEHOLDER_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const assets = [
  'icon.png',
  'splash.png',
  'adaptive-icon.png',
  'favicon.png',
  'notification-icon.png',
];

let created = 0;
assets.forEach(asset => {
  const dest = path.join(assetsDir, asset);
  if (!fs.existsSync(dest)) {
    fs.writeFileSync(dest, Buffer.from(PLACEHOLDER_PNG_BASE64, 'base64'));
    console.log(`  ✓ Created placeholder: assets/${asset}`);
    created++;
  }
});

if (created > 0) {
  console.log(`\n  ⚠️  ${created} placeholder asset(s) created.`);
  console.log('  Replace assets/*.png with proper 1024x1024 icons before publishing.\n');
} else {
  console.log('  ✓ All assets already present.\n');
}
