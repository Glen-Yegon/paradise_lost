const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");  // ✅ FIXED
const CleanCSS = require("clean-css");
const terser = require("terser");

// Directory to search files in
const directory = "./";

// Minify CSS files
function minifyCSSFiles() {
  glob(`${directory}/**/*.css`).then((files) => {
    files.forEach((file) => {
      const original = fs.readFileSync(file, "utf8");
      const minified = new CleanCSS().minify(original).styles;
      const minFile = file.replace(/\.css$/, ".min.css");

      fs.writeFileSync(minFile, minified, "utf8");
      console.log(`Minified CSS: ${file} → ${minFile}`);
    });
  }).catch((err) => console.error("Error finding CSS files:", err));
}

// Minify JS files
function minifyJSFiles() {
  glob(`${directory}/**/*.js`).then(async (files) => {
    for (const file of files) {
      if (file.endsWith(".min.js") || file.includes("minify-all.js")) continue;

      const original = fs.readFileSync(file, "utf8");
      try {
        const result = await terser.minify(original);
        const minFile = file.replace(/\.js$/, ".min.js");

        fs.writeFileSync(minFile, result.code, "utf8");
        console.log(`Minified JS: ${file} → ${minFile}`);
      } catch (err) {
        console.error(`Error minifying JS file ${file}:`, err);
      }
    }
  }).catch((err) => console.error("Error finding JS files:", err));
}

// Run
minifyCSSFiles();
minifyJSFiles();
