const fs = require('fs');
const html = fs.readFileSync('D:/Projects/Rekaz/blogs/blog.html', 'utf-8');
const nameMatches = [...html.matchAll(/<div[^>]*name="([^"]+)"[^>]*>/g)];
let output = 'Named components:\n';
nameMatches.forEach(m => { output += m[1] + '\n'; });
fs.writeFileSync('D:/Projects/Rekaz/scratch-blog-components.txt', output);
