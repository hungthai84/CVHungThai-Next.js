const fs = require('fs');
let code = fs.readFileSync('src/components/Education.tsx', 'utf-8');

// The count text has text-caption font-semibold font-mono. Let's remove text-caption font-semibold to let sub-content flow through, or keep font-mono.
// Actually, I'll just change text-caption to text-body-sub text-subcontent.
code = code.replace(
  'className="text-caption font-semibold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs"',
  'className="text-body-sub text-subcontent font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs"'
);

// For the filter buttons (All, Tech, Management), they have `text-caption font-bold`. I'll remove `text-caption font-bold` and apply `text-body-sub text-subcontent`.
code = code.replace(
  /className=\{`px-3 sm:px-3\.5 py-1 rounded-lg text-caption font-bold tracking-wide transition-all duration-300 cursor-pointer \$\{/g,
  'className={`px-3 sm:px-3.5 py-1 rounded-lg text-body-sub text-subcontent font-semibold tracking-wide transition-all duration-300 cursor-pointer ${'
);

// For the toggle buttons (grid/list)
code = code.replace(
  /className=\{`p-1\.5 rounded-lg transition-all duration-300 cursor-pointer \$\{/g,
  'className={`p-1.5 rounded-lg transition-all duration-300 cursor-pointer ${' // (no typography changes needed here, it's just icons)
);

// Also do the same for list view which might have the same header
code = code.replace(
  'className="text-caption font-semibold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs"',
  'className="text-body-sub text-subcontent font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs"'
);

fs.writeFileSync('src/components/Education.tsx', code);
