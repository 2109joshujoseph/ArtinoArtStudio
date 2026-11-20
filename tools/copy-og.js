const fs = require('fs');
const path = require('path');

const source = path.join(process.env.TEMP, 'artino-og-image.jpg');
const destination = path.join(__dirname, '..', 'public', 'images', 'og-image.jpg');

fs.copyFileSync(source, destination);
console.log(`${source} -> ${destination} (${fs.statSync(destination).size} bytes)`);
