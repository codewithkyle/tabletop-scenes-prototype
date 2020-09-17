const fs = require("fs");
const path = require("path");

const mainJS = path.join(process.cwd(), "public", "js", "main.js");
if (fs.existsSync(mainJS)) {
    fs.unlinkSync(mainJS);
}

const mainCSS = path.join(process.cwd(), "public", "css", "main.css");
if (fs.existsSync(mainCSS)) {
    fs.unlinkSync(mainCSS);
}
