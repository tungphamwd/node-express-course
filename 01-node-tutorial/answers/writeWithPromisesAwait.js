const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("./temporary/temp.txt", "Line 1\nLine 2\nLine 3");
  } catch (error) {
    console.error("Error writing to the file:", error);
  }
};

const reader = async () => {
    try {
        const result = await readFile("./temporary/temp.txt", "utf8")
        console.log(result)
    } catch (error) {
        console.error("Error reading the file:", error)
    }
};

const readWrite = async () => {
    try {
        await writer();
        await reader();
    } catch (error) {
        console.error("Error:", error)
    }
}

readWrite();