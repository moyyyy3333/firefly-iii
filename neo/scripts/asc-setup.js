#!/usr/bin/env node
/**
 * App Store Connect API helper.
 * Registers the Bundle ID and creates the NEO app listing.
 */
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

const KEY_ID     = '6B83VR88CL';
const ISSUER_ID  = '6eb532f2-c593-43cf-9ef0-e5df8d294669';
const KEY_PATH   = '/home/user/firefly-iii/neo/secrets/AuthKey_6B83VR88CL.p8';
const PRIVATE_KEY = fs.readFileSync(KEY_PATH, 'utf8');

const BUNDLE_ID    = 'com.neo.securityguard';
const APP_NAME     = 'NEO - Security Guard';
const APP_SKU      = 'neo-security-guard-001';
const PRIMARY_LANG = 'en-US';

// ── JWT ──────────────────────────────────────────────────────────────────────

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
}

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  const header  = b64url(JSON.stringify({ alg:'ES256', kid:KEY_ID, typ:'JWT' }));
  const payload = b64url(JSON.stringify({ iss:ISSUER_ID, iat:now, exp:now+1100, aud:'appstoreconnect-v1' }));
  const msg = `${header}.${payload}`;

  const sign = crypto.createSign('SHA256');
  sign.update(msg);
  // Node 15+ supports ieee-p1363 encoding (raw r||s) required by JWT ES256
  const sig = sign.sign({ key: PRIVATE_KEY, dsaEncoding: 'ieee-p1363' });
  return `${msg}.${b64url(sig)}`;
}

// ── HTTP helper ───────────────────────────────────────────────────────────────

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const token = makeJWT();
    const data  = body ? JSON.stringify(body) : null;
    const opts  = {
      hostname: 'api.appstoreconnect.apple.com',
      path,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data && { 'Content-Length': Buffer.byteLength(data) }),
      },
    };
    const req = https.request(opts, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Register bundle ID (idempotent — OK if already exists)
  console.log(`\n[1/3] Registering bundle ID: ${BUNDLE_ID}`);
  let bundleIdResourceId;

  const regRes = await api('POST', '/v1/bundleIds', {
    data: {
      type: 'bundleIds',
      attributes: { identifier: BUNDLE_ID, name: 'NEO Security Guard', platform: 'IOS' },
    },
  });

  if (regRes.status === 201) {
    bundleIdResourceId = regRes.body.data.id;
    console.log(`  ✓ Bundle ID registered (resource id: ${bundleIdResourceId})`);
  } else if (regRes.status === 409) {
    // Already exists — look it up
    console.log(`  ℹ Bundle ID already exists, fetching...`);
    const listRes = await api('GET', `/v1/bundleIds?filter[identifier]=${BUNDLE_ID}&filter[platform]=IOS`, null);
    if (listRes.status === 200 && listRes.body.data?.length > 0) {
      bundleIdResourceId = listRes.body.data[0].id;
      console.log(`  ✓ Found existing bundle ID (resource id: ${bundleIdResourceId})`);
    } else {
      console.error('  ✗ Could not find existing bundle ID:', JSON.stringify(listRes.body, null, 2));
      process.exit(1);
    }
  } else {
    console.error('  ✗ Failed to register bundle ID:');
    console.error(JSON.stringify(regRes.body, null, 2));
    process.exit(1);
  }

  // 2. Create app on App Store Connect
  console.log(`\n[2/3] Creating app "${APP_NAME}" on App Store Connect...`);
  const appRes = await api('POST', '/v1/apps', {
    data: {
      type: 'apps',
      attributes: {
        bundleId: BUNDLE_ID,
        name: APP_NAME,
        primaryLocale: PRIMARY_LANG,
        sku: APP_SKU,
      },
    },
  });

  if (appRes.status === 201) {
    const appId = appRes.body.data.id;
    console.log(`  ✓ App created! App Store Connect App ID: ${appId}`);
    outputResult(appId);
  } else if (appRes.status === 409) {
    // App already exists — fetch it
    console.log('  ℹ App already exists, fetching App ID...');
    const listRes = await api('GET', `/v1/apps?filter[bundleId]=${BUNDLE_ID}`, null);
    if (listRes.status === 200 && listRes.body.data?.length > 0) {
      const appId = listRes.body.data[0].id;
      console.log(`  ✓ Found existing app. App Store Connect App ID: ${appId}`);
      outputResult(appId);
    } else {
      console.error('  ✗ Could not find existing app:', JSON.stringify(listRes.body, null, 2));
      process.exit(1);
    }
  } else {
    console.error(`  ✗ Failed to create app (HTTP ${appRes.status}):`);
    console.error(JSON.stringify(appRes.body, null, 2));
    process.exit(1);
  }
}

function outputResult(appId) {
  console.log(`\n[3/3] Writing App ID to file...`);
  fs.writeFileSync('/tmp/neo_asc_app_id.txt', appId);
  console.log(`  ✓ Done. App ID: ${appId}`);
  console.log(`\n  Next: update eas.json with ascAppId: "${appId}"\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
