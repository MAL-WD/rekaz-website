const fs = require('fs');
const jsxPath = 'client/src/pages/Inscription.jsx';
let jsxContent = fs.readFileSync(jsxPath, 'utf8');

jsxContent = jsxContent.replace(
    /const teacherDisplayName = i18n\.language\.startsWith\('ar'\) \? teacher\.name : teacher\.nameEn; const isSelected = formData\.teacher === teacherDisplayName \|\| formData\.teacher === teacher\.nameEn \|\| formData\.teacher === teacher\.name; return \( <button type=\"button\" key=\{teacher\.nameEn\} onClick=\{\(\) => setFormData\(prev => \(\{ \.\.\.prev, teacher: isSelected \? '' : teacherDisplayName \}\)\)\} /g,
    "const teacherDisplayName = i18n.language.startsWith('ar') ? teacher.name : teacher.nameEn;\n                          const isSelected = formData.teacher === teacherDisplayName || formData.teacher === teacher.nameEn || formData.teacher === teacher.name;\n                          return (\n                            <button\n                              type=\"button\"\n                              key={teacher.nameEn}\n                              onClick={() =>\n                                setFormData(prev => ({\n                                  ...prev,\n                                  teacher: isSelected ? '' : teacherDisplayName\n                                }))\n                              }\n                              "
);

fs.writeFileSync(jsxPath, jsxContent, 'utf8');
