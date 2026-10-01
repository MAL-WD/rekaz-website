const fs = require('fs');
const content = fs.readFileSync('d:/Projects/Rekaz/client/src/pages/Inscription.jsx');
const index = content.indexOf('Adel Abd El Kader') - 50;
console.log(content.slice(index, index + 100));
