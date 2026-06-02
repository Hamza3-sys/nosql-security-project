# 💉 TP4 - NoSQL Injection (SOC API Security Lab)

## 📌 Prérequis

- Node.js v20.11.0+
- Docker MongoDB (`mongo_secure`)
- MongoDB accessible sur `127.0.0.1:27018`
- Base `soc_lite` initialisée avec données de test
- PowerShell ou terminal VS Code

---

## 🧱 1. Initialisation de la base `soc_lite`

### 🔗 Connexion MongoDB

```bash
docker exec -it mongo_secure mongosh -u adminSoc -p Passw0rd_S3cure! --authenticationDatabase admin
```

---

### 🗄️ Création des données

```javascript
use soc_lite

// Nettoyage
db.users.drop()
db.security_logs.drop()
db.incidents.drop()

// Users
db.users.insertMany([
  { username: "alice", password: "motdepasse123", role: "analyst" },
  { username: "bob",   password: "secret456",     role: "admin" },
  { username: "carol", password: "carol789",      role: "viewer" }
])

// Security logs
db.security_logs.insertMany([
  { ts: new Date("2026-06-02T08:15:00Z"), src_ip: "192.168.1.10", action: "login", status: "success", severity: "info" },
  { ts: new Date("2026-06-02T08:20:00Z"), src_ip: "10.0.0.50", action: "login", status: "failure", severity: "warning" },
  { ts: new Date("2026-06-02T09:00:00Z"), src_ip: "172.16.0.99", action: "port_scan", status: "detected", severity: "critical" },
  { ts: new Date("2026-06-02T11:00:00Z"), src_ip: "203.0.113.42", action: "login", status: "failure", severity: "high" }
])

// Champ sensible simulé
db.security_logs.updateMany(
  {},
  { $set: { password_hash: "HASH_FICTIF", internal_note: "confidentiel" } }
)

// Vérification
db.users.countDocuments()
db.security_logs.countDocuments()
```

---

## 🚀 2. Création de l’API Node.js

### 📁 Structure

```bash
cd ~/nosql-security-project
mkdir -p soc-api
cd soc-api
```

---

### 📦 package.json

```json
{
  "name": "soc-api",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "mongodb": "^6.3.0"
  }
}
```

```bash
npm install
```

---

## ⚠️ 3. API Vulnérable (NoSQL Injection)

```javascript
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.collection('users').findOne({ username, password });

  if (user) {
    res.json({ success: true, message: `Bienvenue ${user.username}`, role: user.role });
  } else {
    res.status(401).json({ success: false });
  }
});
```

### ❌ Problèmes

- Injection `$ne`
- Injection `$regex`
- Absence de validation
- Trust input utilisateur

---

## 🛡️ 4. API Sécurisée (Version corrigée)

### 🔐 Validation + safeFilter

```javascript
function isValidIPv4(val) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(val);
}

function isCleanString(val) {
  return typeof val === "string" && val.length > 0 && val.length < 100;
}
```

### ✅ Login sécurisé

```javascript
app.post('/auth/login', async (req, res) => {
  if (typeof req.body.username !== "string" || typeof req.body.password !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  const user = await db.collection('users').findOne({ username: req.body.username });

  if (!user || user.password !== req.body.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ success: true, user: user.username, role: user.role });
});
```

---

## ▶️ 5. Lancement des APIs

### API vulnérable (port 3000)

```bash
node server.js
```

### API sécurisée (port 3001)

```bash
node server-safe.js
```

---

## 🧪 6. Tests d’injection (PowerShell)

### 💥 Contournement login (vulnérable)

```powershell
iwr http://localhost:3000/auth/login `
-Method POST `
-Headers @{"Content-Type"="application/json"} `
-Body '{"username":"alice","password":{"$ne":""}}'
```

---

### 💥 Exfiltration logs

```powershell
iwr http://localhost:3000/logs/search `
-Method POST `
-Headers @{"Content-Type"="application/json"} `
-Body '{"src_ip":{"$regex":""}}'
```

---

### 🛡️ API sécurisée (bloqué)

```powershell
iwr http://localhost:3001/auth/login `
-Method POST `
-Headers @{"Content-Type"="application/json"} `
-Body '{"username":"alice","password":{"$ne":""}}'
```

---

## 📊 7. Résumé des attaques

| Attaque | Opérateur | Impact |
|----------|----------|--------|
| Login bypass | `$ne` | Auth bypass |
| Data exfiltration | `$regex` | Dump logs |
| Range attack | `$gt` | Full dataset |

---

## 🛡️ 8. Défense appliquée

- Validation des types (string only)
- Whitelist des champs
- Comparaison JS côté serveur
- Requêtes MongoDB contrôlées
- Projection minimale
- Auth MongoDB + RBAC

---

## 🧱 9. Défense en profondeur

| Niveau | Contrôle |
|--------|----------|
| 1 | Validation input |
| 2 | Safe parsing |
| 3 | safeFilter |
| 4 | Projection limitée |
| 5 | Auth MongoDB |
| 6 | RBAC |
| 7 | Network isolation |

---

## 👨‍💻 Auteur

**Hamza MRANI ALAOUI**  
TP4 - NoSQL Injection Lab  
02/06/2026
