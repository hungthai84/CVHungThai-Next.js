const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
const lines = code.split('\n');

lines[490] = '                </span>';
lines[491] = '                {selectedPhase !== "all" ? (';
lines[492] = '                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>';
lines[493] = '                ) : null}';
lines[494] = '                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", filterDropdownOpen ? "rotate-180" : "")} />';
lines[495] = '              </button>';
lines[496] = '';
lines[497] = '              {/* Filter Dropdown Popover */}';

fs.writeFileSync('src/components/Projects.tsx', lines.join('\n'));
