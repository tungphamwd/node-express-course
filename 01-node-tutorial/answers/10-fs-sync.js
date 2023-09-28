const { readFileSync, writeFileSync } = require("fs");

for (let i = 0; i < 3; i++) {
  if (i === 0) writeFileSync("./temporary/fileA.txt", `Line ${i + 1}\n`);
  else writeFileSync("./temporary/fileA.txt", `Line ${i + 1}\n`, { flag: "a" });
}

const fileA = readFileSync("./temporary/fileA.txt", "utf8");

console.log(fileA);
