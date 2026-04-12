const fs = require("fs");
const path = require("path");

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (fullPath.endsWith(".tsx")) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = [...walk("d:/DelphinAssociates/components"), ...walk("d:/DelphinAssociates/app")];
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, "utf8");
    let original = content;

    // Pattern 1: Single quotes template literal
    content = content.replace(/isHigh \? 'liquid-glass-([^']+)' : ''/g, "isHigh ? 'liquid-glass-$1' : tier === 'mid' && !reducedMotion ? 'mid-glass-$1' : ''");
    
    // Pattern 2: Double quotes template literal
    content = content.replace(/isHigh \? "liquid-glass-([^"]+)" : ""/g, "isHigh ? \"liquid-glass-$1\" : tier === \"mid\" && !reducedMotion ? \"mid-glass-$1\" : \"\"");

    if (content !== original) {
        fs.writeFileSync(file, content, "utf8");
        console.log("Updated components for mid-glass:", file);
        changedFiles++;
    }
});

console.log(`Finished processing. Updated ${changedFiles} files.`);
