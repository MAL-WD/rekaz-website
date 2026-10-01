const fs = require('fs');
['d:/Projects/Rekaz/client/src/locales/ar/translation.json', 
 'd:/Projects/Rekaz/client/src/locales/en/translation.json',
 'd:/Projects/Rekaz/client/src/pages/Inscription.jsx'].forEach(file => {
   const content = fs.readFileSync(file, 'utf8');
   const cleanContent = content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
   fs.writeFileSync(file, cleanContent, 'utf8');
});
