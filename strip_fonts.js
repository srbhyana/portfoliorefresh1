const fs = require('fs');
const glob = require('fs').readdirSync('.');

const htmlFiles = glob.filter(file => file.endsWith('.html') && file !== 'googlea826fa70ad9353fb.html');

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');

  // Remove <em>, <b>, <strong> tags and their closing tags
  html = html.replace(/<\/?(em|b|strong)[^>]*>/gi, '');
  
  // Remove <span class="dim"> and its matching </span>
  // Since regex matching spans can be tricky, let's just do a simple replacement for the specific ones we know.
  // We'll replace <span class="dim"> with nothing, and hopefully the trailing </span> won't break the browser, 
  // OR we can use a small regex for <span class="dim">...</span>
  html = html.replace(/<span class="dim">([\s\S]*?)<\/span>/gi, '$1');

  // Also catch <em style="...">
  // The first regex /<\/?(em|b|strong)[^>]*>/gi already catches <em style="...">
  
  fs.writeFileSync(file, html);
  console.log(`Processed ${file}`);
}
