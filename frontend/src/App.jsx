import React, { useEffect, useMemo, useState } from 'react';
import BarcodeInput from './components/BarcodeInput.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('demo@calzando-a-mexico.com');
  const [password, setPassword] = useState('demo');
  const [products, setProducts] = useState([]);
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState(1);
  const authz = useMemo(() => token ? { Authorization: `Bearer ${token}` } : {}, [token]);

  async function login() {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setToken(data.token);
  }

  async function loadProducts() {
    const res = await fetch(`${API_URL}/products`, { headers: authz });
    const data = await res.json();
    setProducts(data);
  }

  async function inventoryIn() {
    const res = await fetch(`${API_URL}/inventory/in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authz },
      body: JSON.stringify({ sku, qty: Number(qty) })
    });
    const data = await res.json();
    if (data.ok) {
      await loadProducts();
      setSku('');
      setQty(1);
      alert('Entrada registrada');
    } else {
      alert('Error al registrar');
    }
  }

  useEffect(() => {
    if (token) loadProducts();
  }, [token]);

  return (
    <div className="container">
      <h1>Calzando a México</h1>
      <p>Starter JS (React + Express) para Calzando a México.</p>

      {!token ? (
        <div className="card" style={{ marginTop: 16 }}>
          <h2>Login</h2>
          <div className="row">
            <input className="input" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="input" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="btn" onClick={login}>Entrar</button>
          </div>
          <small>El backend devuelve un token simulado. En producción, reemplazar por autenticación real.</small>
        </div>
      ) : (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h2>Inventario</h2>
            <span className="badge">sesión activa</span>
          </div>

          <h3 style={{ marginTop: 0 }}>Entrada (IN)</h3>
          <div className="row">
            <input className="input" placeholder="SKU" value={sku} onChange={e => setSku(e.target.value)} style={{ maxWidth: 240 }} />
            <input className="input" type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} style={{ maxWidth: 120 }} />
            <button className="btn" onClick={inventoryIn}>Agregar</button>
          </div>
          <div style={{ marginTop: 8 }}>
            <BarcodeInput onScan={(code) => setSku(code)} />
            <small>Escanea un código con lector USB (mode keyboard) o escribe y presiona Enter.</small>
          </div>

          <h3>Productos</h3>
          <ul className="list">
            {products.map(p => (
              <li key={p.id}>
                <strong>{p.name}</strong> — SKU: {p.sku} — OnHand: {p.onHand}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
