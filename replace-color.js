const fs = require('fs');
const path = require('path');

const files = [
  'src/app/about/page.tsx',
  'src/app/contacts/page.tsx',
  'src/app/documents/page.tsx',
  'src/app/page.tsx',
  'src/app/projects/page.tsx',
  'src/app/services/page.tsx',
  'src/components/layout/header/index.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/bg-blue-/g, 'bg-brand-');
    content = content.replace(/text-blue-/g, 'text-brand-');
    content = content.replace(/border-blue-/g, 'border-brand-');
    content = content.replace(/hover:bg-blue-/g, 'hover:bg-brand-');
    content = content.replace(/hover:text-blue-/g, 'hover:text-brand-');
    content = content.replace(/hover:border-blue-/g, 'hover:border-brand-');
    content = content.replace(/dark:bg-blue-/g, 'dark:bg-brand-');
    content = content.replace(/dark:text-blue-/g, 'dark:text-brand-');
    content = content.replace(/dark:group-hover:bg-blue-/g, 'dark:group-hover:bg-brand-');
    content = content.replace(/dark:group-hover:text-blue-/g, 'dark:group-hover:text-brand-');
    content = content.replace(/group-hover:bg-blue-/g, 'group-hover:bg-brand-');
    content = content.replace(/group-hover:text-blue-/g, 'group-hover:text-brand-');
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Done replacing blue with brand');
