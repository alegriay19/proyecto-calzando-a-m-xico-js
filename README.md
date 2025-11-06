# Calzando a México · JS Web (Frontend + Backend)

Este repositorio contiene una base **lista para subir a GitHub** para **Calzando a México**.
Incluye **Frontend (React + Vite)** y **Backend (Node.js + Express)**, ambos en JavaScript.

---

## Estructura

```
proyecto-calzando-a-mexico-js/
├─ frontend/              # Aplicación web (React + Vite)
│  ├─ src/
│  │  ├─ components/
│  │  │  └─ BarcodeInput.jsx
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ index.css
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.js
│  └─ .env.example
├─ backend/               # API REST (Express)
│  ├─ src/
│  │  ├─ index.js
│  │  ├─ routes.js
│  │  └─ data.js
│  ├─ package.json
│  └─ .env.example
├─ .gitignore
└─ README.md              # Este archivo
```

---

## Requisitos
- Node.js 18+ y npm

---

## Variables de entorno

**backend/.env**
```
PORT=4000
JWT_SECRET=changeme
FRONTEND_ORIGIN=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:4000
```

---

## Instalación y ejecución local

En **dos terminales** (una para frontend y otra para backend):

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Healthcheck de API: `GET /health` → `{{"ok":true}}`

---

## Rutas iniciales del Backend

- `GET /health` → estado del servicio.
- `POST /auth/login` → login simulado (email, password) devuelve un token de prueba.
- `GET /products` → lista de productos (datos en memoria).
- `POST /inventory/in` → simula una **entrada** de inventario (modifica cantidades en memoria).

---

## Subir a GitHub

```bash
git init
git add .
git commit -m "Calzando a México: base inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/proyecto-calzando-a-mexico-js.git
git push -u origin main
```

---

## Despliegue (rápido)

- **Frontend**: Vercel/Netlify (apunta a `frontend/` y define `VITE_API_URL`).
- **Backend**: Railway/Render/Fly.io/Heroku. Define `PORT`, `JWT_SECRET` y CORS.
