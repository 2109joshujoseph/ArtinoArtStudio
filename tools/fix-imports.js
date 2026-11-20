const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src', 'app', 'pages');
let changed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.ts')) {
      const before = fs.readFileSync(full, 'utf8');
      const after = before
        .replace(/'\.\.\/core\//g, "'../../core/")
        .replace(/'\.\.\/shared\//g, "'../../shared/");
      if (after !== before) {
        fs.writeFileSync(full, after, 'utf8');
        console.log('fixed', path.relative(path.join(__dirname, '..'), full));
        changed++;
      }
    }
  }
}

walk(root);
console.log('total changed:', changed);
