// server-safe.js — VERSION CORRIGÉE
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3001;  // port différent pour ne pas confondre

const URI = 'mongodb://adminSoc:Passw0rd_S3cure!@localhost:27018/soc_lite?authSource=admin';

app.use(express.json());
let db;

MongoClient.connect(URI).then(client => {
  db = client.db('soc_lite');
  console.log('[OK] Connecté à MongoDB');
  app.listen(PORT, () => console.log(`[OK] API sécurisée sur :${PORT}`));
}).catch(err => { console.error(err); process.exit(1); });

// Fonctions de validation
function isValidIPv4(val) {
  if (typeof val !== 'string') return false;
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(val) && val.split('.').every(n => +n <= 255);
}

function isCleanString(val) {
  if (typeof val !== 'string') return false;
  if (val.trim().length === 0) return false;
  if (val.length > 100) return false;
  return true;
}

// ─── ENDPOINT 1 : /logs/search SÉCURISÉ ─────────────────
app.post('/logs/search', async (req, res) => {
  const safeFilter = {};

  if (req.body.src_ip !== undefined) {
    if (!isValidIPv4(req.body.src_ip))
      return res.status(400).json({ error: 'src_ip invalide — format IPv4 requis' });
    safeFilter.src_ip = req.body.src_ip;
  }

  if (req.body.action !== undefined) {
    if (!isCleanString(req.body.action))
      return res.status(400).json({ error: 'action invalide' });
    safeFilter.action = req.body.action;
  }

  try {
    const results = await db.collection('security_logs')
                            .find(safeFilter)
                            .project({ _id: 0, ts: 1, src_ip: 1, action: 1, status: 1 })
                            .limit(20)
                            .toArray();
    res.json({ count: results.length, data: results });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ─── ENDPOINT 2 : /auth/login SÉCURISÉ ──────────────────
app.post('/auth/login', async (req, res) => {
  if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string')
    return res.status(400).json({ error: 'username et password doivent être des chaînes' });

  const username = req.body.username.trim();
  const password = req.body.password;

  if (!isCleanString(username) || password.length === 0)
    return res.status(400).json({ error: 'Entrée invalide' });

  try {
    const user = await db.collection('users').findOne(
      { username },
      { projection: { _id: 0, username: 1, password: 1, role: 1 } }
    );
    if (!user || user.password !== password)
      return res.status(401).json({ success: false, message: 'Identifiants incorrects' });

    res.json({ success: true, message: `Bienvenue ${user.username}`, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});