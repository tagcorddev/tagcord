const fs = require("fs");
const path = require("path");

const functionMap = {};

// Load all functions from /functions
const files = fs.readdirSync(path.join(__dirname, "functions"));
for (const file of files) {
  const name = file.split(".")[0];
  functionMap[`$${name}`] = require(`./functions/${file}`);
}

module.exports = async function parseFunctions(code, message, args) {
  let output = code;
  for (const tag in functionMap) {
    if (output.includes(tag)) {
      const replacement = await functionMap[tag](message, args);
      output = output.replaceAll(tag, replacement);
    }
  }
  return output;
};
