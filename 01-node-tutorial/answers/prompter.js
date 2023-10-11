const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};


let message = "Guess a number";
let randomNumber = Math.round(Math.random()*100);
const form = () => {
  return `
  <body>
  <p>${message}</p>
  <form method="POST">
  <input type="number" min=0 max=100 name="number"></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      const guessNumber = +body["number"]
      console.log("Your guess number is: ", guessNumber);
      if (guessNumber) {
        if (guessNumber > randomNumber) {
          message = "Your guess number is higher"
        }
        if (guessNumber < randomNumber) {
          message = "Your guess number is smaller"
        }
        if(guessNumber === randomNumber) {
          message = "Congratulations! The number is: "+randomNumber
        }
      } else {
        item = "Please put your guess.";
      }
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});
server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});
server.listen(3000);
console.log("The server is listening on port 3000.");
