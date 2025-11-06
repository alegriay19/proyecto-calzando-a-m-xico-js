import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from './data.js';

const router = express.Router();

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'missing_credentials' });
  const token = jwt.sign({ sub: email, role: 'user' }, process.env.JWT_SECRET || 'changeme', { expiresIn: '2h' });
  res.json({ token, user: { email, role: 'user' } });
});

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'no_token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    next();
  } catch {
    return res.status(401).json({ error: 'invalid_token' });
  }
}

router.get('/products', auth, (_req, res) => {
  res.json(db.products.map(p => ({ id: p.id, name: p.name, sku: p.sku, onHand: p.onHand })));
});

router.post('/inventory/in', auth, (req, res) => {
  const { sku, qty } = req.body || {};
  if (!sku || !qty || qty <= 0) return res.status(400).json({ error: 'bad_request' });
  const product = db.products.find(p => p.sku === sku);
  if (!product) return res.status(404).json({ error: 'not_found' });
  product.onHand += qty;
  db.movements.push({ type: 'IN', sku, qty, at: new Date().toISOString(), user: req.user.sub });
  res.json({ ok: true, product });
});

export default router;
