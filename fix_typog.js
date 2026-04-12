const fs = require("fs");
const path = require("path");

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (file !== "node_modules" && file !== ".next") {
        filelist = walkSync(dirFile, filelist);
      }
    }
    else {
      if (dirFile.endsWith(".tsx")) filelist.push(dirFile);
    }
  });
  return filelist;
}

const files = [...walkSync("d:\\DelphinAssociates\\components"), ...walkSync("d:\\DelphinAssociates\\app")];

files.forEach(file => {
  let content = fs.readFileSync(file, "utf8");
  let modified = false;

  const replace = (regex, replacement) => {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      modified = true;
    }
  };

  replace(/\bmin-h-screen\b/g, "min-h-[100dvh]");
  replace(/\bh-screen\b/g, "h-[100dvh]");

  replace(/text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-8xl/g, "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl");
  replace(/text-4xl sm:text-5xl lg:text-6xl/g, "text-[32px] sm:text-4xl lg:text-6xl");
  replace(/text-3xl sm:text-5xl md:text-6xl lg:text-7xl/g, "text-3xl sm:text-4xl md:text-5xl lg:text-7xl");
  replace(/text-3xl sm:text-5xl md:text-6xl/g, "text-[28px] sm:text-4xl md:text-6xl");
  replace(/text-3xl sm:text-4xl md:text-5xl lg:text-7xl/g, "text-[28px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl");
  replace(/text-2xl sm:text-4xl md:text-5xl/g, "text-[26px] sm:text-3xl md:text-5xl");

  if (modified) {
    fs.writeFileSync(file, content);
  }
});

