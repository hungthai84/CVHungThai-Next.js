const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
const lines = code.split('\n');

// At line 650, span is opened.
lines[649] = '                                <span className={cn("font-mono text-2xs font-black", isSelected ? "text-white" : badgeVariant.text)}>';
lines[650] = '                                  {formattedIndex}';
lines[651] = '                                </span>';
lines[652] = '                              </div>';
lines[653] = '';
lines[654] = '                              {/* Group Title Badge (Góc trên cùng bên right) */}';
lines[655] = '                              <div className="absolute top-2.5 right-2.5 z-20 max-w-[68%] px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/60 shadow-md">';
lines[656] = '                                <span className="font-bold text-caption text-slate-800 dark:text-slate-200 truncate block">';
lines[657] = '                                  {card.groupTitle}';
lines[658] = '                                </span>';
lines[659] = '                              </div>';
lines[660] = '                            </div>';

fs.writeFileSync('src/components/Projects.tsx', lines.join('\n'));
