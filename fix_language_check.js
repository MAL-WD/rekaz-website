const fs = require('fs');
const file = 'd:/Projects/Rekaz/client/src/pages/Inscription.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/i18n\.language === 'ar'/g, "i18n.language.startsWith('ar')");

fs.writeFileSync(file, content, 'utf8');
