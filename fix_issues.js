const fs = require('fs');

// 1. Fix translation.json
const arPath = 'client/src/locales/ar/translation.json';
let arContent = fs.readFileSync(arPath, 'utf8');
if (arContent.charCodeAt(0) === 0xFEFF) arContent = arContent.slice(1);
const arData = JSON.parse(arContent);

arData.whyRekaz.packBacTitle = 'باقة ركاز للبكالوريا (Pack-BAC)';
arData.whyRekaz.packBacDesc = 'باقة ركاز للبكالوريا : فيها حصرًا ثلاث مواد (اللغة العربية + فلسفة + تاريخ وجغرافيا) بسعر مادتين فقط.';
arData.whyRekaz.packBacPriceDesc = 'باقة ركاز للبكالوريا : فيها حصرًا ثلاث مواد (اللغة العربية + فلسفة + تاريخ وجغرافيا) مقابل 4000 دج — بسعر مادتين فقط.';
arData.inscription.packBacTitle = 'باقة ركاز للبكالوريا (Pack-BAC)';
arData.inscription.packBacDesc = 'باقة ركاز للبكالوريا : فيها حصرًا ثلاث مواد (اللغة العربية + فلسفة + تاريخ وجغرافيا)';

fs.writeFileSync(arPath, JSON.stringify(arData, null, 4), 'utf8');


const enPath = 'client/src/locales/en/translation.json';
let enContent = fs.readFileSync(enPath, 'utf8');
if (enContent.charCodeAt(0) === 0xFEFF) enContent = enContent.slice(1);
const enData = JSON.parse(enContent);

enData.whyRekaz.packBacTitle = 'Rekaz BAC Pack (Pack-BAC)';
enData.whyRekaz.packBacDesc = 'Rekaz BAC Pack: exclusively contains three subjects (Arabic Language + Philosophy + History & Geography) for the price of only 2 subjects.';
enData.whyRekaz.packBacPriceDesc = 'Rekaz BAC Pack: exclusively contains three subjects (Arabic + Philosophy + History & Geography) for 4000 DA — the price of 2 subjects.';
enData.inscription.packBacTitle = 'Rekaz BAC Pack (Pack-BAC)';
enData.inscription.packBacDesc = 'Rekaz BAC Pack: exclusively contains three subjects (Arabic Language + Philosophy + History & Geography)';

fs.writeFileSync(enPath, JSON.stringify(enData, null, 4), 'utf8');

// 2. Fix Inscription.jsx
const jsxPath = 'client/src/pages/Inscription.jsx';
let jsxContent = fs.readFileSync(jsxPath, 'utf8');

// Fix BAC Pack condition: show for all lycee, not just 3AS
jsxContent = jsxContent.replace(
    /\{formData\.programType === 'lycee' && formData\.level === '3AS' && \(/g,
    "{formData.programType === 'lycee' && ("
);

// Fix BAC Pack onClick: automatically set level to 3AS and select the 3 subjects
jsxContent = jsxContent.replace(
    /onClick=\{\(\) => setFormData\(prev => \(\{ \.\.\.prev, isPackBac: !prev\.isPackBac \}\)\)\}/g,
    "onClick={() => setFormData(prev => { const nextPackBac = !prev.isPackBac; return { ...prev, isPackBac: nextPackBac, level: nextPackBac ? '3AS' : prev.level, subjects: nextPackBac ? ['arabicLit', 'philosophy', 'historyGeography'] : prev.subjects }; })}"
);


// Fix Teacher Name Selection & Avatar
// Replace old teacher avatar rendering
jsxContent = jsxContent.replace(
    /\{teacher\.nameEn\.charAt\(0\)\}/g,
    "{(i18n.language.startsWith('ar') ? teacher.name : teacher.nameEn).charAt(0)}"
);

// Replace teacher click handler so it saves the correct localized name
jsxContent = jsxContent.replace(
    /const isSelected = formData\.teacher === teacher\.nameEn;\s*return \(\s*<button\s*type="button"\s*key=\{teacher\.nameEn\}\s*onClick=\{\(\) =>\s*setFormData\(prev => \(\{\s*\.\.\.prev,\s*teacher: isSelected \? '' : teacher\.nameEn\s*\}\)\)\s*\}/g,
    "const teacherDisplayName = i18n.language.startsWith('ar') ? teacher.name : teacher.nameEn; const isSelected = formData.teacher === teacherDisplayName || formData.teacher === teacher.nameEn || formData.teacher === teacher.name; return ( <button type=\"button\" key={teacher.nameEn} onClick={() => setFormData(prev => ({ ...prev, teacher: isSelected ? '' : teacherDisplayName }))} "
);

// Fix Step 3 teacher summary to ensure it correctly displays
// (Already displays formData.teacher, which will now be the correct localized name)

fs.writeFileSync(jsxPath, jsxContent, 'utf8');

