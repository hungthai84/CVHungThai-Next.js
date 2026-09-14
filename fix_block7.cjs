const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
const lines = code.split('\n');

lines[710] = '      {/* ================= FULLSCREEN IMAGE PREVIEW MODAL ================= */}';
lines[711] = '      {previewImage && (';
lines[712] = '        <div';
lines[713] = '          role="dialog"';

fs.writeFileSync('src/components/Projects.tsx', lines.join('\n'));
