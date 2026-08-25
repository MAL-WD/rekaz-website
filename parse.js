const fs = require('fs');

const html = fs.readFileSync('d:/Projects/Rekaz/index.html', 'utf-8');

// The framer export often has a div with id="main" or similar.
// Let's just pretty print it or extract components using regex for <nav, <header, etc.
let output = '';

// Find all tags with name="Navbar" or name="Hero"
const nameMatches = [...html.matchAll(/<div[^>]*name="([^"]+)"[^>]*>/g)];
output += 'Named components:\n';
nameMatches.forEach(m => {
    output += `${m[1]}: ${m[0]}\n`;
});

// Let's try to extract the framer DOM structure
const idMainStart = html.indexOf('id="main"');
if(idMainStart !== -1) {
    output += 'Found id="main"\n';
    output += html.substring(idMainStart, idMainStart + 5000);
}

fs.writeFileSync('d:/Projects/Rekaz/scratch.txt', output);
