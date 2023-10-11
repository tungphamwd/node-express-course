const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", { highWaterMark: 200 });

let counter = 0;

stream.on("data", (chunk) => {
  counter++;
  console.log(`Received chunk: ${chunk}`);
});

stream.on("end", () => {
  console.log(`Total chunks received: ${counter}`);
});

stream.on("error", (error) => {
  console.error("Error:", error.message);
});
