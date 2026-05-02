#!/usr/bin/env bash
set -e

KEY_ID="6B83VR88CL"
ISSUER_ID="6eb532f2-c593-43cf-9ef0-e5df8d294669"
KEY_PATH="/home/user/firefly-iii/neo/secrets/AuthKey_6B83VR88CL.p8"
BUNDLE_ID="com.neo.securityguard"
APP_NAME="NEO - Security Guard"
APP_SKU="neo-security-guard-001"

# ── Generate JWT via Node (no outbound needed for signing) ───────────────────
TOKEN=$(node - <<'JSEOF'
const crypto = require('crypto');
const fs = require('fs');

const KEY_ID    = '6B83VR88CL';
const ISSUER_ID = '6eb532f2-c593-43cf-9ef0-e5df8d294669';
const KEY       = fs.readFileSync('/home/user/firefly-iii/neo/secrets/AuthKey_6B83VR88CL.p8','utf8');

function b64url(s) {
  return Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
}
const now = Math.floor(Date.now()/1000);
const hdr = b64url(JSON.stringify({alg:'ES256',kid:KEY_ID,typ:'JWT'}));
const pld = b64url(JSON.stringify({iss:ISSUER_ID,iat:now,exp:now+1100,aud:'appstoreconnect-v1'}));
const msg = `${hdr}.${pld}`;
const sign = crypto.createSign('SHA256');
sign.update(msg);
const sig = sign.sign({key:KEY,dsaEncoding:'ieee-p1363'});
console.log(`${msg}.${b64url(sig)}`);
JSEOF
)

echo "[1/3] JWT generated (${#TOKEN} chars)"

# ── Step 1: Register Bundle ID ───────────────────────────────────────────────
echo ""
echo "[2/3] Registering bundle ID: $BUNDLE_ID"

BUNDLE_RESP=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
  "https://api.appstoreconnect.apple.com/v1/bundleIds" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": {
      \"type\": \"bundleIds\",
      \"attributes\": {
        \"identifier\": \"$BUNDLE_ID\",
        \"name\": \"NEO Security Guard\",
        \"platform\": \"IOS\"
      }
    }
  }")

BUNDLE_STATUS=$(echo "$BUNDLE_RESP" | grep "HTTP_STATUS:" | cut -d: -f2)
BUNDLE_BODY=$(echo "$BUNDLE_RESP" | grep -v "HTTP_STATUS:")

if [ "$BUNDLE_STATUS" = "201" ]; then
  echo "  ✓ Bundle ID registered"
elif [ "$BUNDLE_STATUS" = "409" ]; then
  echo "  ℹ Bundle ID already exists — looking up..."
  TOKEN=$(node - <<'JSEOF'
const crypto = require('crypto');
const fs = require('fs');
const KEY_ID='6B83VR88CL',ISSUER_ID='6eb532f2-c593-43cf-9ef0-e5df8d294669';
const KEY=fs.readFileSync('/home/user/firefly-iii/neo/secrets/AuthKey_6B83VR88CL.p8','utf8');
function b64url(s){return Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');}
const now=Math.floor(Date.now()/1000);
const h=b64url(JSON.stringify({alg:'ES256',kid:KEY_ID,typ:'JWT'}));
const p=b64url(JSON.stringify({iss:ISSUER_ID,iat:now,exp:now+1100,aud:'appstoreconnect-v1'}));
const m=`${h}.${p}`;const s=crypto.createSign('SHA256');s.update(m);
console.log(`${m}.${b64url(s.sign({key:KEY,dsaEncoding:'ieee-p1363'}))}`);
JSEOF
)
else
  echo "  ✗ Failed to register bundle ID (HTTP $BUNDLE_STATUS):"
  echo "$BUNDLE_BODY"
  exit 1
fi

# ── Step 2: Create App ────────────────────────────────────────────────────────
echo ""
echo "[3/3] Creating app on App Store Connect..."

# Refresh token
TOKEN=$(node - <<'JSEOF'
const crypto = require('crypto');
const fs = require('fs');
const KEY_ID='6B83VR88CL',ISSUER_ID='6eb532f2-c593-43cf-9ef0-e5df8d294669';
const KEY=fs.readFileSync('/home/user/firefly-iii/neo/secrets/AuthKey_6B83VR88CL.p8','utf8');
function b64url(s){return Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');}
const now=Math.floor(Date.now()/1000);
const h=b64url(JSON.stringify({alg:'ES256',kid:KEY_ID,typ:'JWT'}));
const p=b64url(JSON.stringify({iss:ISSUER_ID,iat:now,exp:now+1100,aud:'appstoreconnect-v1'}));
const m=`${h}.${p}`;const s=crypto.createSign('SHA256');s.update(m);
console.log(`${m}.${b64url(s.sign({key:KEY,dsaEncoding:'ieee-p1363'}))}`);
JSEOF
)

APP_RESP=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
  "https://api.appstoreconnect.apple.com/v1/apps" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": {
      \"type\": \"apps\",
      \"attributes\": {
        \"bundleId\": \"$BUNDLE_ID\",
        \"name\": \"$APP_NAME\",
        \"primaryLocale\": \"en-US\",
        \"sku\": \"$APP_SKU\"
      }
    }
  }")

APP_STATUS=$(echo "$APP_RESP" | grep "HTTP_STATUS:" | cut -d: -f2)
APP_BODY=$(echo "$APP_RESP" | grep -v "HTTP_STATUS:")

if [ "$APP_STATUS" = "201" ]; then
  APP_ID=$(echo "$APP_BODY" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.parse(d).data.id))")
  echo "  ✓ App created! App ID: $APP_ID"
  echo "$APP_ID" > /tmp/neo_asc_app_id.txt
elif [ "$APP_STATUS" = "409" ]; then
  echo "  ℹ App already exists — fetching App ID..."
  TOKEN=$(node - <<'JSEOF'
const crypto = require('crypto');
const fs = require('fs');
const KEY_ID='6B83VR88CL',ISSUER_ID='6eb532f2-c593-43cf-9ef0-e5df8d294669';
const KEY=fs.readFileSync('/home/user/firefly-iii/neo/secrets/AuthKey_6B83VR88CL.p8','utf8');
function b64url(s){return Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');}
const now=Math.floor(Date.now()/1000);
const h=b64url(JSON.stringify({alg:'ES256',kid:KEY_ID,typ:'JWT'}));
const p=b64url(JSON.stringify({iss:ISSUER_ID,iat:now,exp:now+1100,aud:'appstoreconnect-v1'}));
const m=`${h}.${p}`;const s=crypto.createSign('SHA256');s.update(m);
console.log(`${m}.${b64url(s.sign({key:KEY,dsaEncoding:'ieee-p1363'}))}`);
JSEOF
)
  LIST_RESP=$(curl -s "https://api.appstoreconnect.apple.com/v1/apps?filter[bundleId]=$BUNDLE_ID" \
    -H "Authorization: Bearer $TOKEN")
  APP_ID=$(echo "$LIST_RESP" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{ const p=JSON.parse(d); console.log(p.data&&p.data[0]?p.data[0].id:'NOT_FOUND'); })")
  if [ "$APP_ID" = "NOT_FOUND" ]; then
    echo "  ✗ Could not find existing app. Full response:"
    echo "$LIST_RESP"
    exit 1
  fi
  echo "  ✓ Found existing app. App ID: $APP_ID"
  echo "$APP_ID" > /tmp/neo_asc_app_id.txt
else
  echo "  ✗ Failed to create app (HTTP $APP_STATUS):"
  echo "$APP_BODY"
  exit 1
fi

echo ""
echo "══════════════════════════════════════"
echo "  App Store Connect App ID: $APP_ID"
echo "══════════════════════════════════════"
