const fs = require('fs');
let code = fs.readFileSync('src/components/Experience.tsx', 'utf-8');

// Replace flex flex-col with grid grid-cols-1 sm:grid-cols-2
code = code.replace(
  '{/* Chuyển thành 1 cột 2 hàng */}\n                            <div className="flex flex-col gap-3">',
  '{/* Chuyển thành view 2 cột */}\n                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">'
);

fs.writeFileSync('src/components/Experience.tsx', code);
