const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The marker for where to start deleting
const deleteStart = html.indexOf('<!-- STATS -->');
// The marker for where to stop deleting (right before contact)
const deleteEnd = html.indexOf('<!-- CONTACT -->');

const before = html.substring(0, deleteStart);
const after = html.substring(deleteEnd);

const newStyles = `
/* ═══ THE WORK DIRECTORY ══════════════════════════════════ */
.dir-wrap {
  padding: 100px 52px;
  background: #040404;
  border-top: 1px solid rgba(255,255,255,.05);
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.dir-inner {
  max-width: 1000px;
  margin: 0 auto;
}
.dir-header {
  font-family: var(--font-disp);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--text);
  margin-bottom: 48px;
  text-align: center;
}
.dir-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.dir-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 60px 32px;
  background: linear-gradient(135deg, rgba(200,169,110,.05), rgba(200,169,110,.01));
  border: 1px solid rgba(200,169,110,.15);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s var(--ease);
  color: var(--gold);
}
.dir-btn:hover {
  transform: translateY(-8px);
  background: linear-gradient(135deg, rgba(200,169,110,.1), rgba(200,169,110,.03));
  border-color: rgba(200,169,110,.4);
  box-shadow: 0 20px 40px rgba(0,0,0,.4), 0 0 0 1px rgba(200,169,110,.1);
}
.dir-btn svg {
  width: 40px;
  height: 40px;
  margin-bottom: 24px;
  opacity: 0.8;
  transition: transform 0.4s var(--ease);
}
.dir-btn:hover svg {
  transform: scale(1.1) translateY(-4px);
  opacity: 1;
}
.dir-btn-title {
  font-family: var(--font-disp);
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.dir-btn-sub {
  font-size: 13px;
  color: var(--mute);
}

/* ═══ MANIFESTO ═══════════════════════════════════════════ */
.manifesto-wrap {
  padding: 120px 52px;
  background: #070b13;
}
.manifesto-inner {
  max-width: 720px;
  margin: 0 auto;
}
.manifesto-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.manifesto-tag::before {
  content: '';
  width: 30px;
  height: 1px;
  background: var(--gold);
}
.manifesto-title {
  font-family: var(--font-disp);
  font-size: clamp(38px, 6vw, 64px);
  font-weight: 800;
  color: var(--text);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 48px;
}
.manifesto-p {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(237,240,247,.6);
  margin-bottom: 24px;
}
.manifesto-p strong {
  color: var(--text);
  font-weight: 500;
}
.manifesto-p em {
  color: var(--gold);
  font-style: italic;
}
@media(max-width: 900px) {
  .dir-grid { grid-template-columns: 1fr; }
  .dir-btn { padding: 40px 24px; }
}
`;

// Inject new styles right before </style>
const styleEndIdx = before.indexOf('</style>');
const beforeWithStyles = before.slice(0, styleEndIdx) + newStyles + before.slice(styleEndIdx);

const newSections = `
  <!-- THE WORK DIRECTORY -->
  <div class="dir-wrap" id="work" data-section="cinema">
    <div class="dir-inner">
      <h2 class="dir-header rv">The Work</h2>
      <div class="dir-grid">
        <a href="projects.html" class="dir-btn rv rv1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="5" width="16" height="14" rx="1.5"/><circle cx="12" cy="12" r="3.2"/></svg>
          <div class="dir-btn-title">Positioning</div>
          <div class="dir-btn-sub">Finding the one true thing</div>
        </a>
        <a href="projects.html" class="dir-btn rv rv2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div class="dir-btn-title">Messaging</div>
          <div class="dir-btn-sub">Making the position feel real</div>
        </a>
        <a href="projects.html" class="dir-btn rv rv3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          <div class="dir-btn-title">B2B SaaS Spec</div>
          <div class="dir-btn-sub">Translating craft into ARR</div>
        </a>
      </div>
    </div>
  </div>

  <!-- MANIFESTO -->
  <div class="manifesto-wrap" id="manifesto" data-section="dark">
    <div class="manifesto-inner">
      <div class="manifesto-tag rv">Philosophy</div>
      <h2 class="manifesto-title rv rv1">Why B2B &amp; PMM Now?</h2>
      
      <p class="manifesto-p rv rv2">
        The principles of marketing don't change, <em>they just invert</em>. I've always been a generalist, but right now, I need specialist exposure. I have a keen interest in building with AI and adapting to exactly what the market demands.
      </p>
      
      <p class="manifesto-p rv rv3">
        I treat my career like an entrepreneur. I may have spent 1.5 years at a time in my previous roles, but that's because <strong>I operate like the CEO of my own trajectory</strong>—making the most of every resource and climbing wherever I can provide the highest ROI to my employer.
      </p>

      <p class="manifesto-p rv rv4">
        I am highly adaptable, fiercely learnable, and I protect an employer's bottom line. Advertising shut down on me before, but this time, I'm looking to plant my feet in an industry that won't collapse and stick somewhere to truly build for the next 3+ years.
      </p>
    </div>
  </div>
`;

fs.writeFileSync('index.html', beforeWithStyles + newSections + '\n  ' + after);
