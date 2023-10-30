const express = require("express");
const app = express();
const peopleRouter = require("./routes/people")
const { products } = require("./data");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${method} ${url}`);
  next();
}
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1> Resource not found</h1>");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    res.status(404).json({ message: "That product was not found." });
  } else {
    res.json(product);
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice } = req.query;

  let filteredProducts = products;
  if (search) {
    filteredProducts = products.filter((product) =>
      product.name.startsWith(search)
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(maxPrice)
    );
  }

  res.json(filteredProducts);
});

// app.get('/', logger, (req, res) => {
//   console.log('logger worked!')
// })

app.use("/api/v1/people", peopleRouter);

app.use(logger);

app.use(express.static("./methods-public"));

