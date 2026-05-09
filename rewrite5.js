const fs = require('fs');
let html = fs.readFileSync('cv.html', 'utf8');

// 1. Remove Strengths from side-index
html = html.replace('<a href="#strengths">Strengths</a>\n', '');
html = html.replace('<a href="#strengths">Strengths</a>', '');

// 2. Remove entire Strengths section
const extractSection = (str, startTag, endTag) => {
  const startIdx = str.indexOf(startTag);
  if(startIdx === -1) return '';
  const endIdx = str.indexOf(endTag, startIdx);
  if(endIdx === -1) return '';
  return str.substring(startIdx, endIdx);
};

const strSection = extractSection(html, '<!-- STRENGTHS -->', '<!-- EDUCATION -->');
if (strSection) {
  html = html.replace(strSection, '');
}

// 3. Fix the Hero Portrait CSS
// The user says "my face is merging into the headline and there is just a lot of negative space of the right side"
// Let's change object-position and the mask so the face sits clearly on the right.
// `simran.jpeg` might have the face in the center/left. By doing object-position: right 30%; or center 10%; we can shift it.
// Let's remove the complex mask that might be eating the face, and just use a soft gradient to the left.
const oldPortraitCSS = `.hero-portrait{position:absolute;top:0;right:0;bottom:0;width:52%;max-width:720px;pointer-events:none;z-index:0;overflow:hidden;isolation:isolate;
  mask-image:linear-gradient(to left,#000 40%,transparent 96%),linear-gradient(to bottom,transparent 0%,#000 18%,#000 84%,transparent 100%);
  -webkit-mask-image:linear-gradient(to left,#000 40%,transparent 96%),linear-gradient(to bottom,transparent 0%,#000 18%,#000 84%,transparent 100%);
  mask-composite:intersect;-webkit-mask-composite:source-in}
.hero-portrait img{width:100%;height:100%;object-fit:cover;object-position:center 20%;
  filter:grayscale(100%) contrast(1.15) brightness(.75);opacity:.6;will-change:transform}`;

const newPortraitCSS = `.hero-portrait{position:absolute;top:0;right:-5%;bottom:0;width:45%;max-width:700px;pointer-events:none;z-index:0;overflow:hidden;
  mask-image:linear-gradient(to left,#000 60%,transparent 100%),linear-gradient(to bottom,transparent 5%,#000 15%,#000 90%,transparent 100%);
  -webkit-mask-image:linear-gradient(to left,#000 60%,transparent 100%),linear-gradient(to bottom,transparent 5%,#000 15%,#000 90%,transparent 100%);
  mask-composite:intersect;-webkit-mask-composite:source-in}
.hero-portrait img{width:100%;height:100%;object-fit:cover;object-position:center top;
  filter:grayscale(100%) contrast(1.15) brightness(.65);opacity:.5;will-change:transform}`;

html = html.replace(oldPortraitCSS, newPortraitCSS);

fs.writeFileSync('cv.html', html);
