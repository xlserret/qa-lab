import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("Please log in.");
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      setToken(response.data.token);
      setStatus(`Logged in as ${response.data.user.username}`);
    } catch (error) {
      console.error(error);
      setToken(null);
      setStatus("Login failed.");
    }
  };

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
        setStatus("Failed to load products.");
      });
  }, [token]);

  return (
    <main>
      <h1>QA Lab Store</h1>
      <p>{status}</p>

      {!token && (
        <form onSubmit={login}>
          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button type="submit">Login</button>
        </form>
      )}

      {token && (
        <section>
          <h2>Products</h2>

          {products.map((product) => (
            <article key={product.id}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;