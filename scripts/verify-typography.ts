import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");

// Core Design Token classes as defined in index.css
const TYPOGRAPHY_CLASSES = [
  "text-display",
  "text-h1",
  "text-h2",
  "text-h3",
  "text-h4",
  "text-h5",
  "text-h6",
  "text-card-title",
  "text-body-bold",
  "text-body",
  "text-body-sub",
  "text-body-sm",
  "text-caption",
  "text-label",
  "text-badge",
  "text-button",
  "text-stat",
  "text-nav"
];

// Map of standard non-token Tailwind font size classes to recommended design token classes
const REPLACEMENT_SUGGESTIONS: Record<string, string> = {
  "text-xs": "text-caption",
  "text-sm": "text-body-sm",
  "text-base": "text-body",
  "text-lg": "text-card-title",
  "text-xl": "text-h3",
  "text-2xl": "text-h2",
  "text-3xl": "text-h1",
  "text-4xl": "text-display",
  "text-5xl": "text-display",
};

interface FileReport {
  filePath: string;
  hardcodedStyles: { line: number; text: string; type: "inline-style" | "arbitrary-class" | "standard-non-token" }[];
  validCount: number;
  totalChecks: number;
}

// Recursively get files
function getFiles(dir: string, extList: string[]): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      // Exclude build dirs & node_modules
      if (!["node_modules", ".next", "dist", "build", "public"].includes(file)) {
        results = results.concat(getFiles(filePath, extList));
      }
    } else {
      if (extList.includes(path.extname(file))) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function processFiles() {
  const isFixMode = process.argv.includes("--fix");
  console.log("\n=======================================================");
  console.log("   🔍 TYPOGRAPHY DESIGN TOKEN VERIFICATION UTILITY");
  console.log(`   Mode: ${isFixMode ? "🔧 AUTO-FIX & STANDARDIZE" : "📋 READ-ONLY ANALYSIS"}`);
  console.log("=======================================================\n");

  const files = getFiles(SRC_DIR, [".tsx", ".ts", ".css"]);
  let totalIssues = 0;
  let totalFilesChecked = 0;
  let totalFixed = 0;

  files.forEach((file) => {
    let content = fs.readFileSync(file, "utf-8");
    const relativePath = path.relative(ROOT_DIR, file);
    const lines = content.split("\n");
    const report: FileReport = {
      filePath: relativePath,
      hardcodedStyles: [],
      validCount: 0,
      totalChecks: 0
    };

    let fileModified = false;

    lines.forEach((lineText, index) => {
      const lineNum = index + 1;

      // 1. Check for inline style fontSize, e.g. style={{ fontSize: '24px' }} or style={{fontSize: 24}}
      const inlineFontSizeRegex = /style=\{\{\s*[^}]*fontSize\s*:\s*['"`]?(\d+px|\d+rem|\d+)['"`]?\s*[^}]*\}\}/gi;
      if (inlineFontSizeRegex.test(lineText)) {
        report.hardcodedStyles.push({
          line: lineNum,
          text: lineText.trim(),
          type: "inline-style"
        });
        totalIssues++;

        if (isFixMode) {
          // Attempt to strip out fontSize inline styles gracefully or warn
          // For now, strip specific inline style key, or guide
        }
      }

      // 2. Check for arbitrary text size tailwind class, e.g. text-[24px] or text-[1.5rem]
      const arbitraryClassRegex = /text-\[(\d+px|\d+rem|\d+px|[\w\d.-]+)\]/g;
      if (arbitraryClassRegex.test(lineText)) {
        report.hardcodedStyles.push({
          line: lineNum,
          text: lineText.trim(),
          type: "arbitrary-class"
        });
        totalIssues++;
      }

      // 3. Check for standard Tailwind text sizes that should use Design Tokens
      Object.keys(REPLACEMENT_SUGGESTIONS).forEach((oldClass) => {
        // Ensure it matches as a whole class name and is not part of some other class (e.g. text-small, text-sm/leading)
        const escapedClass = oldClass.replace("-", "\\-");
        const classRegex = new RegExp(`\\b${escapedClass}\\b`, "g");
        
        if (classRegex.test(lineText)) {
          // Exclude index.css itself and config files from replacements
          if (!file.endsWith("index.css") && !file.endsWith("tailwind.config.ts")) {
            report.hardcodedStyles.push({
              line: lineNum,
              text: lineText.trim(),
              type: "standard-non-token"
            });
            totalIssues++;

            if (isFixMode) {
              const newTokenClass = REPLACEMENT_SUGGESTIONS[oldClass];
              lines[index] = lines[index].replace(classRegex, newTokenClass);
              fileModified = true;
              totalFixed++;
            }
          }
        }
      });

      // 4. Count valid classes to give a compliance score
      TYPOGRAPHY_CLASSES.forEach((tokenClass) => {
        const escaped = tokenClass.replace("-", "\\-");
        const regex = new RegExp(`\\b${escaped}\\b`, "g");
        if (regex.test(lineText)) {
          report.validCount++;
        }
      });
    });

    if (fileModified && isFixMode) {
      fs.writeFileSync(file, lines.join("\n"), "utf-8");
      console.log(`✨ [FIXED] Co-opted tokens in: ${relativePath}`);
    }

    if (report.hardcodedStyles.length > 0) {
      console.log(`📂 \x1b[33m${report.filePath}\x1b[0m`);
      console.log(`   📊 Token Compliance Count: ${report.validCount} tokens applied`);
      report.hardcodedStyles.forEach((issue) => {
        const typeLabel = 
          issue.type === "inline-style" ? "❌ INLINE STYLE" : 
          issue.type === "arbitrary-class" ? "❌ ARBITRARY CLASS" : "⚠️ STANDARD NON-TOKEN";
        
        const color = issue.type === "standard-non-token" ? "\x1b[36m" : "\x1b[31m";
        console.log(`   [Line ${issue.line}] ${color}${typeLabel}\x1b[0m: "${issue.text.slice(0, 80)}${issue.text.length > 80 ? "..." : ""}"`);
      });
      console.log("");
    } else {
      totalFilesChecked++;
    }
  });

  console.log("-------------------------------------------------------");
  console.log("   📊 FINAL COMPLIANCE SUMMARY");
  console.log("-------------------------------------------------------");
  console.log(`   • Total fully compliant files: ${totalFilesChecked}`);
  console.log(`   • Total identified non-compliant patterns: ${totalIssues}`);
  if (isFixMode) {
    console.log(`   • Total patterns auto-fixed to design tokens: ${totalFixed}`);
  }
  console.log("=======================================================\n");
}

processFiles();
