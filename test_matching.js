const fs = require('fs');
const content = fs.readFileSync('d:/Projects/Rekaz/client/src/pages/Inscription.jsx', 'utf8');
const match = content.match(/const tsAr = \(teacher\.subject \|\| ''\)\.toLowerCase\(\);[\s\S]*?return tsEn/);
console.log(match[0]);
