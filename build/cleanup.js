const fs = require("fs");
const path = require("path");

const mainJS = path.join(process.cwd(), "public", "main.js");
if (fs.existsSync(mainJS)) {
    fs.unlinkSync(mainJS);
}

const mainCSS = path.join(process.cwd(), "public", "main.css");
if (fs.existsSync(mainCSS)) {
    fs.unlinkSync(mainCSS);
}
