const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
const lines = code.split('\n');

lines[521] = '                        <div className="flex items-center gap-2 truncate pr-2">';
lines[522] = '                          <span className={cn("w-2 h-2 rounded-full shrink-0", isActive ? "bg-white" : "bg-blue-500")} />';
lines[523] = '                          <span className="font-bold text-caption">';
lines[524] = '                            {isVi ? tab.labelVi : tab.labelEn}';
lines[525] = '                          </span>';
lines[526] = '                        </div>';
lines[527] = '                        <span className={cn("font-mono text-3xs px-2 py-0.5 rounded-full font-bold shrink-0", isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400")} >';
lines[528] = '                          {tab.count}';
lines[529] = '                        </span>';
lines[530] = '                      </button>';
lines[531] = '                    );';
lines[532] = '                  })}';

fs.writeFileSync('src/components/Projects.tsx', lines.join('\n'));
