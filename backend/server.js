
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Dummy Database (Products)
let products = [
  {
    id: 1,
    name: "Casual Shirt",
    price: 499,
    image: "https://assets.codepen.io/10602517/Casual Shirts.jpg"
  },
  {
    id: 2,
    name: "Check Shirt",
    price: 399,
    image: "https://assets.codepen.io/10602517/Check Shirts.jpg"
  },
  {
    id: 3,
    name: "Denim Shirt",
    price: 599,
    image: "https://assets.codepen.io/10602517/Denim Shirts.jpg"
  },
  {
    id: 4,
    name: "Stripe Shirt",
    price: 450,
    image: "https://assets.codepen.io/10602517/Stripe Shirts.jpg"
  }
];

// ✅ Root route → serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ✅ GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ GET single product
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// ✅ POST add product
app.post("/products", (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
    image: image || "https://via.placeholder.com/150"
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct
  });
});

// ✅ PUT update product
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, image } = req.body;

  let found = false;

  products = products.map(p => {
    if (p.id == id) {
      found = true;
      return { ...p, name, price, image };
    }
    return p;
  });

  if (!found) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product updated successfully" });
});

// ✅ DELETE product
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  const initialLength = products.length;
  products = products.filter(p => p.id != id);

  if (products.length === initialLength) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
});

// ✅ Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});