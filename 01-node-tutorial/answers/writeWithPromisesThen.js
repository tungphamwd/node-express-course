const { writeFile, readFile } = require("fs").promises;

writeFile("./temporary/temp.txt", "Line 1\n")
  .then(() => {
    return writeFile("./temporary/temp.txt", "Line 2\n", { flag: "a" }).then(
      () => {
        return writeFile("./temporary/temp.txt", "Line 3", { flag: "a" })
          .then(() => {
            return readFile("./temporary/temp.txt", "utf-8");
          })
          .then((result) => {
            console.log(result);
          });
      }
    );
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
