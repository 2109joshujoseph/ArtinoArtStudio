const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const imageDir = path.join(root, 'public', 'images');
const srcDir = path.join(root, 'src');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|html|scss|css|json|xml|txt|md)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const sourceText = walk(srcDir)
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');

const files = fs.readdirSync(imageDir);
const used = [];
const unused = [];

for (const name of files) {
  const pattern = new RegExp(`images/${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
  if (pattern.test(sourceText)) used.push(name);
  else unused.push(name);
}

console.log(`used (${used.length}):`);
for (const name of used) console.log(`  ${name}`);
console.log(`\nunused (${unused.length}):`);
for (const name of unused) console.log(`  ${name}`);
