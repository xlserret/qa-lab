const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "qa-lab-backend",
  });
});

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Mechanical Keyboard", price: 99.99 },
    { id: 2, name: "Wireless Mouse", price: 49.99 },
    { id: 3, name: "USB-C Hub", price: 39.99 },
  ]);
});

app.listen(PORT, () => {
  console.log(`QA Lab Backend running on port ${PORT}`);
});