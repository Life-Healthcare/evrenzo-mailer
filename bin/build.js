const { execSync } = require("child_process");
const path = require("path");

const fs = require("fs");

const buildPath = path.resolve(__dirname, "..", "build" +
    "");
const srcPath = path.resolve(__dirname, "..", "src");
const htmlSrcFile = path.join(srcPath, "index.html");
const htmlBuildFile = path.join(buildPath, "index.html");
const phpBuildFile = path.join(buildPath, "index.php");

if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

if (fs.existsSync(htmlBuildFile)) {
  fs.unlinkSync(htmlBuildFile);
}

if (fs.existsSync(phpBuildFile)) {
  fs.unlinkSync(phpBuildFile);
}

execSync(`npx css-inline ${htmlSrcFile} ${htmlBuildFile}`, {
  stdio: "inherit",
});
execSync(`npx css-inline ${htmlSrcFile} ${phpBuildFile}`, {
  stdio: "inherit",
});

let html = fs.readFileSync(htmlBuildFile, "utf8");
let php = fs.readFileSync(phpBuildFile, "utf8");



php = php.replace(/<span id="mailto-name"><\/span>/g, `<?php $name; ?>`);
const phpContent = `<?php ?>
${php}`;

fs.writeFileSync(htmlBuildFile, html, "utf8");
fs.writeFileSync(phpBuildFile, phpContent, "utf8");