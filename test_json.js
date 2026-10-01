const fs = require('fs');
const content = fs.readFileSync('d:/Projects/Rekaz/client/src/locales/ar/translation.json', 'utf8');
const data = JSON.parse(content);
console.log(data.inscription.subjects);
