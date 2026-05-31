import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("Loading products...");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((response) => {
        setProducts(response.data);
        setStatus("Products loaded successfully");
      })
      .catch((error) => {
        console.error(error);
        setStatus("Failed to load products");
      });
  }, []);

  return (
    <main>
      <h1>QA Lab Store</h1>
      <p>{status}</p>

      <section>
        <h2>Products</h2>

        {products.map((product) => (
          <article key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;