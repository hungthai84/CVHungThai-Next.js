const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
const lines = code.split('\n');

lines[694] = '                                    {tag}';
lines[695] = '                                  </span>';
lines[696] = '                                ))}';
lines[697] = '                              </div>';
lines[698] = '                              {/* Deleted Interactive Action Row */}';
lines[699] = '                            </div>';
lines[700] = '                          </div>';
lines[701] = '                        </KeyframersTiltCard>';
lines[702] = '                        </motion.div>';
lines[703] = '                      );';
lines[704] = '                    })}';
lines[705] = '                </div>';
lines[706] = '                </div>';
lines[707] = '            )}';
lines[708] = '          </div>';
lines[709] = '        )}';
lines[710] = '';
lines[711] = '      {/* ================= FULLSCREEN IMAGE PREVIEW MODAL ================= */}';
lines[712] = '      {previewImage && (';

fs.writeFileSync('src/components/Projects.tsx', lines.join('\n'));
