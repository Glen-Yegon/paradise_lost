const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");
const CleanCSS = require("clean-css");
const terser = require("terser");

const directory = "./";

// 🔥 STEP 1: Delete existing .min.css and .min.js files
async function cleanMinifiedFiles() {
  const minFiles = await glob(`${directory}/**/*.min.{css,js}`);
  minFiles.forEach((file) => {
    fs.removeSync(file);
    console.log(`🧹 Deleted: ${file}`);
  });
}

// 🧼 STEP 2: Minify CSS
async function minifyCSSFiles() {
  const files = await glob(`${directory}/**/*.css`);
  files.forEach((file) => {
    if (file.endsWith(".min.css")) return; // Skip already minified

    const original = fs.readFileSync(file, "utf8");
    const minified = new CleanCSS().minify(original).styles;
    const minFile = file.replace(/\.css$/, ".min.css");

    fs.writeFileSync(minFile, minified, "utf8");
    console.log(`✅ Minified CSS: ${file} → ${minFile}`);
  });
}

// ⚙️ STEP 3: Minify JS
async function minifyJSFiles() {
  const files = await glob(`${directory}/**/*.js`);
  for (const file of files) {
    if (file.endsWith(".min.js") || file.includes("minify-all.js")) continue;

    const original = fs.readFileSync(file, "utf8");
    try {
      const result = await terser.minify(original);
      const minFile = file.replace(/\.js$/, ".min.js");

      fs.writeFileSync(minFile, result.code, "utf8");
      console.log(`✅ Minified JS: ${file} → ${minFile}`);
    } catch (err) {
      console.error(`❌ Error minifying JS: ${file}`, err);
    }
  }
}

// 🚀 RUN SCRIPT
(async () => {
  console.log("🔁 Cleaning up existing .min files...");
  await cleanMinifiedFiles();

  console.log("\n🎯 Minifying CSS files...");
  await minifyCSSFiles();

  console.log("\n⚡ Minifying JS files...");
  await minifyJSFiles();
})();
