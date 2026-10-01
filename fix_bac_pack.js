const fs = require('fs');
const file = 'd:/Projects/Rekaz/client/src/pages/Inscription.jsx';
let content = fs.readFileSync(file, 'utf8');

const currentOnClick = "onClick={() => setFormData(prev => { const nextPackBac = !prev.isPackBac; return { ...prev, isPackBac: nextPackBac, subjects: nextPackBac ? ['arabicLit', 'philosophy', 'historyGeography'] : prev.subjects }; })}";
const oldOnClick = "onClick={() => setFormData(prev => ({ ...prev, isPackBac: !prev.isPackBac }))}";

content = content.replace(currentOnClick, oldOnClick);
fs.writeFileSync(file, content, 'utf8');
