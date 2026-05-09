const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Hero Contrast ("my currency")
// Change .hero-title .dim css
html = html.replace('.hero-title .dim{color:var(--mute);display:block}', '.hero-title .dim{color:var(--text);font-style:italic;display:block}');

// 2. Elevate Simran.GPT
const gptStyle = `
/* ═══ SIMRAN GPT CALLOUT ══════════════════════════════════ */
.gpt-callout {
  padding: 60px 52px;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: center;
}
.gpt-inner {
  max-width: 800px;
  text-align: center;
  background: rgba(200,169,110,0.05);
  border: 1px solid rgba(200,169,110,0.2);
  border-radius: 16px;
  padding: 48px;
}
.gpt-inner h2 {
  font-family: var(--font-disp);
  font-size: 32px;
  color: var(--text);
  margin-bottom: 16px;
}
.gpt-inner p {
  color: var(--mute);
  font-size: 16px;
  margin-bottom: 24px;
}
@media(max-width: 640px) {
  .gpt-callout { padding: 40px 20px; }
  .gpt-inner { padding: 32px 20px; }
}
`;
html = html.replace('/* ═══ STATS ════════════════════════════════════════════════ */', gptStyle + '\n/* ═══ STATS ════════════════════════════════════════════════ */');

const gptHTML = `
  <!-- SIMRAN GPT CALLOUT -->
  <div class="gpt-callout" data-section="dark">
    <div class="gpt-inner rv">
      <h2>Interview me on your own time.</h2>
      <p>Hiring managers are busy. So I built an AI that answers your questions exactly how I would. Ask it about my frameworks, my failures, or my philosophy.</p>
      <a href="author-ai.html" class="btn">
        Talk to Simran.GPT
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  </div>
`;
html = html.replace('<!-- STATS -->', gptHTML + '\n  <!-- STATS -->');

// 3. Clean font hierarchy & remove Roman Numerals
html = html.replace('<span class="pos-tag">I, Positioning</span>', '<span class="pos-tag">Positioning</span>');
html = html.replace('<div class="cin-tag">II, Messaging</div>', '<div class="cin-tag">Messaging</div>');
html = html.replace('<div class="b2b-tag">III, B2B SaaS Spec</div>', '<div class="b2b-tag">B2B SaaS Spec</div>');

// Remove roman numerals from positioning cards
html = html.replace('<span class="pos-card-num">I</span>', '');
html = html.replace('<span class="pos-card-num">II</span>', '');
html = html.replace('<span class="pos-card-num">III</span>', '');

// 4. Add cadences to Positioning cards
html = html.replace(
  '<p class="pos-card-desc">Commodity storage → <em style="font-style:normal;color:var(--gold)">enabler of stories</em>. 15 months of positioning across Valentine, Pursuit of Photography, and UGC.</p>',
  '<p class="pos-card-desc">Commodity storage → <em style="font-style:normal;color:var(--gold)">enabler of stories</em>.</p><ul style="font-size:13px;color:rgba(220,232,255,.5);margin:10px 0 0 20px;line-height:1.6"><li>Valentine Campaign (Awareness)</li><li>Pursuit of Photography (Engagement)</li><li>UGC Contest (Conversion)</li></ul>'
);

html = html.replace(
  '<p class="pos-card-desc">80 villas, internally yours, externally uniform. Conformity vs. autonomy became the brand. ₹100Cr+ launch.</p>',
  '<p class="pos-card-desc">80 villas, internally yours, externally uniform. Conformity vs. autonomy became the brand.</p><ul style="font-size:13px;color:rgba(220,232,255,.5);margin:10px 0 0 20px;line-height:1.6"><li>Phase 1: Pre-launch teaser (7 days)</li><li>Phase 2: Launch event (14 days)</li><li>Phase 3: Sustenance & Sales enablement</li></ul>'
);

html = html.replace(
  '<p class="pos-card-desc">Voice, hierarchy, positioning for a super-app, a luxury-tech flagship, and a mindful hostel, the compass that keeps campaigns coherent.</p>',
  '<p class="pos-card-desc">Voice, hierarchy, positioning across distinct categories.</p><ul style="font-size:13px;color:rgba(220,232,255,.5);margin:10px 0 0 20px;line-height:1.6"><li>Tata Neu: Super-app architecture</li><li>Moto: Luxury-tech flagship positioning</li><li>Young Monk: Hospitality tone system</li></ul>'
);


// 5. Structure & Flow
// Extract sections
const extractSection = (str, startTag, endTag) => {
  const startIdx = str.indexOf(startTag);
  const endIdx = str.indexOf(endTag, startIdx);
  if(startIdx === -1 || endIdx === -1) return '';
  return str.substring(startIdx, endIdx);
};

const wordcloudSec = extractSection(html, '<!-- WORD CLOUD -->', '<!-- MESSAGING, 2×2 -->');
const messagingSec = extractSection(html, '<!-- MESSAGING, 2×2 -->', '<!-- B2B SPEC CASE STRIPE -->');

// Remove wordcloud and messaging from their current position
html = html.replace(wordcloudSec, '');
html = html.replace(messagingSec, '');

// Insert them after positioning, but inside a logical flow
const positioningEndStr = '  <div class="pos-divider" data-section="positioning"></div>';
const positioningEndIdx = html.indexOf(positioningEndStr) + positioningEndStr.length;

// Bridge section
const bridgeStyle = `
/* ═══ BRIDGE ══════════════════════════════════════════════ */
.bridge-wrap {
  background: #060912;
  padding: 120px 52px;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,.05);
}
.bridge-title {
  font-family: var(--font-disp);
  font-size: clamp(32px, 5vw, 64px);
  color: var(--text);
  line-height: 1.1;
  max-width: 800px;
  margin: 0 auto 24px;
  letter-spacing: -0.02em;
}
.bridge-title em {
  font-style: italic;
  color: var(--gold);
}
.bridge-desc {
  font-size: 16px;
  color: var(--mute);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}
`;
html = html.replace('/* ═══ B2B CASE STRIPE, 3-UP ═══════════════════════════════ */', bridgeStyle + '\n/* ═══ B2B CASE STRIPE, 3-UP ═══════════════════════════════ */');

const bridgeHTML = `
  <!-- BRIDGE -->
  <div class="bridge-wrap" id="bridge" data-section="b2b">
    <h2 class="bridge-title rv">Consumer brands require <em>emotion.</em><br/>B2B SaaS requires <em>evidence.</em></h2>
    <p class="bridge-desc rv rv1">The principles of positioning don't change, but the execution does. Here is how I translate narrative craft into commercial ARR logic.</p>
  </div>
`;

// New Flow: Positioning -> Wordcloud (maybe keep it?) -> Messaging -> Bridge -> B2B
const newFlowHTML = `
` + messagingSec + wordcloudSec + bridgeHTML + `
`;

html = html.slice(0, positioningEndIdx) + newFlowHTML + html.slice(positioningEndIdx);

fs.writeFileSync('index.html', html);
