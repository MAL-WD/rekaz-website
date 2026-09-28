const fs = require('fs');
const file = 'd:/Projects/Rekaz/client/src/pages/Inscription.jsx';
let content = fs.readFileSync(file, 'utf8');

const originalTeachers =   const teachersByProgram = {
    lycee: [
      { name: 'عادل عبد القدير', subject: 'فلسفة', nameEn: 'Adel Abd El Kader', subjectEn: 'Philosophy' },
      { name: 'محمد الطيب قرارة', subject: 'فيزياء', nameEn: 'Mohamed El Tayeb Grara', subjectEn: 'Physics' },
      { name: 'وليد فراج', subject: 'رياضيات', nameEn: 'Walid Faraj', subjectEn: 'Mathematics' },
      { name: 'رقية منصوري', subject: 'علوم طبيعية', nameEn: 'Rokia Mansouri', subjectEn: 'Natural Sciences' },
      { name: 'زقيدة عزالي', subject: 'علوم طبيعية', nameEn: 'Zguida Azali', subjectEn: 'Natural Sciences' },
      { name: 'عادل عبد العزيز', subject: 'لغة عربية', nameEn: 'Adel Abd El Aziz', subjectEn: 'Arabic Language' },
      { name: 'أميرة بسو', subject: 'إنجليزية', nameEn: 'Amira Bassou', subjectEn: 'English' },
      { name: 'أسماء بن يحي', subject: 'فرنسية', nameEn: 'Asma Ben Yahia', subjectEn: 'French' },
      { name: 'عبد العزيز قدير', subject: 'تاريخ وجغرافيا', nameEn: 'Abd El Aziz Kadir', subjectEn: 'History & Geography' },
      { name: 'عماد سليماني', subject: 'رياضيات', nameEn: 'Imad Slimani', subjectEn: 'Mathematics' },
      { name: 'سميرة طالبي', subject: 'محاسبة', nameEn: 'Samira Talbi', subjectEn: 'Accounting' },
    ],
    cem: [
      { name: 'هديل مرسو', subject: 'رياضيات', nameEn: 'Hadil Mersou', subjectEn: 'Mathematics' },
      { name: 'وليد فراج', subject: 'رياضيات', nameEn: 'Walid Faraj', subjectEn: 'Mathematics' },
      { name: 'نور الهدى منوني', subject: 'فيزياء', nameEn: 'Nour El Hoda Manouni', subjectEn: 'Physics' },
      { name: 'حمزة بالي', subject: 'فرنسية', nameEn: 'Hamza Bali', subjectEn: 'French' },
      { name: 'خالد بن جيلالي', subject: 'إنجليزية', nameEn: 'Khaled Ben Jilali', subjectEn: 'English' },
      { name: 'رياض براهمي', subject: 'إنجليزية', nameEn: 'Riad Brahmi', subjectEn: 'English' },
      { name: 'عزالي', subject: 'علوم', nameEn: 'Azali', subjectEn: 'Sciences' },
      { name: 'عادل عبد القدير عبد العزيز', subject: 'لغة عربية', nameEn: 'Adel Abd El Kader Abd El Aziz', subjectEn: 'Arabic Language' },
      { name: 'عالي روقية', subject: '', nameEn: 'Ali Rokia', subjectEn: '' },
      { name: 'بخضرة رزيقي', subject: 'فرنسية', nameEn: 'Bakhda Reziki', subjectEn: 'French' },
    ]
  };;

// We know the current corrupted text is between "const teachersByProgram = {" and "const handleProgramChange = (progId) => {"
content = content.replace(/const teachersByProgram = \{[\s\S]*?\]\s*\};\s*const handleProgramChange =/, originalTeachers + '\n\n  const handleProgramChange =');

fs.writeFileSync(file, content, 'utf8');
