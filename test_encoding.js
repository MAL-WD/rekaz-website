const fs = require('fs');
const content = fs.readFileSync('d:/Projects/Rekaz/client/src/pages/Inscription.jsx', 'utf8');
const match = content.match(/const teachersByProgram = \{[\s\S]*?\]/);
console.log(match[0].substring(0, 200));
