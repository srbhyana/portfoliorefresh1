const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove all <strong>, </strong>, <em>, </em>
html = html.replace(/<\/?(strong|em)[^>]*>/gi, '');

// 2. Fix the Hero copy (since I just removed the tags, I don't need to do anything else, it's already stripped)

// 3. Extract GPT Callout and Manifesto
const extractSection = (str, startTag, endTag) => {
  const startIdx = str.indexOf(startTag);
  if(startIdx === -1) return '';
  let endIdx = -1;
  if (endTag) {
     endIdx = str.indexOf(endTag, startIdx);
     if(endIdx === -1) endIdx = str.length;
  } else {
     endIdx = str.length;
  }
  return str.substring(startIdx, endIdx);
};

// GPT section
const gptStart = html.indexOf('<!-- SIMRAN GPT CALLOUT -->');
const gptEnd = html.indexOf('<!-- THE WORK DIRECTORY -->');
const gptSec = html.substring(gptStart, gptEnd);

// Manifesto section
const manStart = html.indexOf('<!-- MANIFESTO -->');
const manEnd = html.indexOf('<!-- CONTACT -->');
const manSec = html.substring(manStart, manEnd);

// Now remove them from HTML temporarily
html = html.substring(0, gptStart) + html.substring(gptEnd, manStart) + html.substring(manEnd);

// Now create a combined section for GPT and Manifesto side by side
const combinedCSS = `
/* ═══ SPLIT SECTION ══════════════════════════════════════ */
.split-wrap {
  padding: 120px 52px;
  background: #070b13;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: stretch;
  max-width: 1400px;
  margin: 0 auto;
}
.gpt-box, .manifesto-box {
  background: rgba(200,169,110,0.02);
  border: 1px solid rgba(200,169,110,0.1);
  border-radius: 16px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.gpt-box h2, .manifesto-box h2 {
  font-family: var(--font-disp);
  font-size: clamp(28px, 4vw, 42px);
  color: var(--text);
  margin-bottom: 24px;
  line-height: 1.1;
}
.gpt-box p, .manifesto-box p {
  color: rgba(237,240,247,.6);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 24px;
}
@media(max-width: 900px) {
  .split-wrap { grid-template-columns: 1fr; gap: 40px; padding: 60px 20px; }
  .gpt-box, .manifesto-box { padding: 32px 24px; }
}
`;

// Insert the combined CSS right before </style>
const styleEndIdx = html.indexOf('</style>');
html = html.slice(0, styleEndIdx) + combinedCSS + html.slice(styleEndIdx);

const combinedHTML = `
  <!-- SPLIT SECTION: GPT & MANIFESTO -->
  <div class="split-wrap" id="about" data-section="dark">
    
    <!-- SIMRAN GPT -->
    <div class="gpt-box rv rv1">
      <h2>Interview me on your own time.</h2>
      <p>Hiring managers are busy. So I built an AI that answers your questions exactly how I would. Ask it about my frameworks, my failures, or my philosophy.</p>
      <div>
        <a href="author-ai.html" class="btn">
          Talk to Simran.GPT
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>

    <!-- MANIFESTO -->
    <div class="manifesto-box rv rv2">
      <h2>Why B2B & PMM Now?</h2>
      <p>
        The principles of marketing don't change, they just invert. I spent the last 3 years in agency for that, to solidify my moat as a t-shaped marketer - I have operated like the CEO of my own trajectory for last 6 years.
      </p>
      <p>
        I have a keen interest in building with AI and adapting to exactly what the market demands. I am highly adaptable, fiercely learnable, and I protect an employer's bottom line. Advertising shut down on me before, but this time, I'm looking to plant my feet in an industry that won't collapse and stick somewhere to truly build for the next 3+ years.
      </p>
    </div>

  </div>
`;

// Insert combinedHTML before <!-- CONTACT -->
const contactIdx = html.indexOf('<!-- CONTACT -->');
html = html.slice(0, contactIdx) + combinedHTML + '\n' + html.slice(contactIdx);

// 4. Update the Directory links
html = html.replace('href="projects.html"', 'href="projects.html#positioning"');
html = html.replace('href="projects.html"', 'href="projects.html#messaging"');
html = html.replace('href="projects.html"', 'href="projects.html#b2b"'); // Note: Replace is sequential

fs.writeFileSync('index.html', html);
