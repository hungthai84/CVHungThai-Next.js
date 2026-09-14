const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
const lines = code.split('\n');

lines[726] = '              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[80vw]">';
lines[727] = '                {previewImage.title}';
lines[728] = '              </span>';
lines[729] = '              <button';
lines[730] = '                onClick={() => setPreviewImage(null)}';
lines[731] = '                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"';
lines[732] = '              >';
lines[733] = '                <X className="w-4 h-4" />';
lines[734] = '              </button>';
lines[735] = '            </div>';

fs.writeFileSync('src/components/Projects.tsx', lines.join('\n'));
