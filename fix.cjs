const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
const lines = code.split('\n');

// Line 487 has `hidden xs:inline`, close it at 491
// Line 492 has `bg-white animate-pulse`, close it at 492

lines[490] = lines[490] + '\n                </span>';
lines[491] = lines[491] + '></span>';
// For line 494, it was empty, we can just replace it with null
lines[494] = '                    null';

// Line 524
// 524-                      <span className="font-bold text-caption">
// 525-                        {isVi ? tab.labelVi : tab.labelEn}
// -> add </span> at 526
lines[525] = lines[525] + '\n                      </span>';

// Line 648
// 648-                                <span className={cn("font-mono text-2xs font-black", isSelected ? "text-white" : badgeVariant.text)}>
// 649-                                  {formattedIndex}
// -> add </span> at 650
lines[649] = lines[649] + '\n                                </span>';

// Line 654
// 654-                                <span className="font-bold text-caption text-slate-800 dark:text-slate-200 truncate block">
// 655-                                  {card.groupTitle}
// -> add </span> at 656
lines[655] = lines[655] + '\n                                </span>';

// Line 692
// 692-                                  <span
// 693...
// 698-                                    {tag}
// -> add </span> at 699
lines[699] = lines[699] + '\n                                  </span>';

// Line 721
// 721-              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[80vw]">
// 722-                {previewImage.title}
// -> add </span> at 723
lines[722] = lines[722] + '\n              </span>';

fs.writeFileSync('src/components/Projects.tsx', lines.join('\n'));
