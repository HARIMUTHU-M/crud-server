const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = [];

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!!",
  });
});

app.post("/api/add_product", (req, res) => {
  // console.log("Result", req.body);

  const productData = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.desc,
  };

  products.push(productData);
  console.log("Final", productData);

  res.status(200).send({
    status_code: 200,
    message: "Product Created",
    product: productData,
  });
});

app.get("/api/get_product", (req, res) => {
  if (products.length > 0) {
    res.status(200).json({
      status_code: 200,
      products: products,
    });
  } else if (products.length === 0) {
    res.status(200).json({
      status_code: 200,
      products: "No product available!!",
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port} !!`);
});
