import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { config } from './config.js';

const STORE = path.resolve('previews.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(STORE, 'utf8'));
  } catch {
    return {};
  }
}

function save(data) {
  fs.writeFileSync(STORE, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Register a generated site for serving and return its public preview URL.
 * The clock does not start until the recipient first opens the link.
 */
export function registerPreview(slug, { business = '', recipient = '' } = {}) {
  const data = load();
  const token = crypto.randomBytes(16).toString('hex');
  data[token] = {
    slug,
    business,
    recipient,
    createdAt: Date.now(),
    firstOpenedAt: null,
  };
  save(data);
  return `${config.previews.baseUrl.replace(/\/$/, '')}/p/${token}`;
}

/**
 * Look up a token, stamping the first-open time on the first hit.
 * Returns { status: 'ok'|'expired'|'notfound', record? }.
 */
export function openPreview(token) {
  const data = load();
  const rec = data[token];
  if (!rec) return { status: 'notfound' };

  if (!rec.firstOpenedAt) {
    rec.firstOpenedAt = Date.now();
    save(data);
  }

  const ttlMs = config.previews.ttlHours * 3600 * 1000;
  if (Date.now() > rec.firstOpenedAt + ttlMs) {
    return { status: 'expired', record: rec };
  }
  return { status: 'ok', record: rec };
}

/**
 * Inject a watermark + light copy-deterrents into the page before serving.
 *
 * Honest note: this CANNOT prevent screenshots or screen recording — nothing on
 * the web can. The watermark just makes any capture obviously your unfinished,
 * branded preview. The script blocks casual right-click/save only.
 */
export function watermarkHtml(html, rec) {
  const label = `${rec.business || 'PREVIEW'} — Preview by ${config.previews.studioName}`;
  const tile = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');

  const overlay = `
<style>
  .__wm{position:fixed;inset:0;z-index:2147483647;pointer-events:none;
    background-image:repeating-linear-gradient(-30deg,transparent 0 180px,rgba(0,0,0,.03) 180px 360px);}
  .__wm span{position:absolute;color:rgba(0,0,0,.10);font:600 22px/1 system-ui,sans-serif;
    white-space:nowrap;transform:rotate(-30deg);user-select:none;}
  @media print{body{display:none!important}}
</style>
<div class="__wm" aria-hidden="true" id="__wm"></div>
<script>
(function(){
  // tile the watermark across the viewport
  var wm=document.getElementById('__wm');
  function fill(){wm.innerHTML='';var w=innerWidth,h=innerHeight;
    for(var y=-100;y<h+200;y+=160){for(var x=-100;x<w+400;x+=380){
      var s=document.createElement('span');s.textContent=${JSON.stringify(tile)};
      s.style.left=x+'px';s.style.top=y+'px';wm.appendChild(s);}}}
  fill();addEventListener('resize',fill);
  // light, easily-bypassed deterrents (do not rely on these)
  addEventListener('contextmenu',function(e){e.preventDefault();});
  addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if(e.ctrlKey&&(k==='s'||k==='u'||k==='p')){e.preventDefault();}
  });
})();
</script>`;

  if (html.includes('</body>')) return html.replace('</body>', overlay + '\n</body>');
  return html + overlay;
}
