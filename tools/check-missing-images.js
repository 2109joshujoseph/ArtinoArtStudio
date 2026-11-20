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

const referenced = new Set();
for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/images\/([\w.-]+\.(?:jpg|jpeg|png|webp|svg))/gi)) {
    referenced.add(match[1]);
  }
}

const missing = [...referenced].filter(
  (name) => !fs.existsSync(path.join(imageDir, name)),
);

console.log('referenced files:', referenced.size);
console.log('missing on disk:', missing.length);
for (const name of missing) console.log('  MISSING', name);
