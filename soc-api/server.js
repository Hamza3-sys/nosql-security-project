// server.js — VERSION VULNÉRABLE (démonstration locale uniquement)
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;

// URI pour mongo_secure (port 27018) avec authentification
const URI = 'mongodb://adminSoc:Passw0rd_S3cure!@localhost:27018/soc_lite?authSource=admin';

app.use(express.json());
let db;

MongoClient.connect(URI).then(client => {
  db = client.db('soc_lite');
  console.log('[OK] Connecté à MongoDB');
  app.listen(PORT, () => console.log(`[OK] API vulnérable sur :${PORT}`));
}).catch(err => { console.error(err); process.exit(1); });

// ─── ENDPOINT 1 : recherche de logs ──────────────────────
// ❌ req.body passé directement dans find() — VULNÉRABLE
app.post('/logs/search', async (req, res) => {
  try {
    const results = await db.collection('security_logs')
                            .find(req.body)    // ❌ injection possible ici
                            .limit(20).toArray();
    res.json({ count: results.length, data: results });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── ENDPOINT 2 : login ──────────────────────────────────
// ❌ password peut contenir {"$ne":""} → contourne l'authentification
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.collection('users')
                         .findOne({ username, password });  // ❌
    if (user) res.json({ success: true, message: `Bienvenue ${user.username}`, role: user.role });
    else res.status(401).json({ success: false, message: 'Identifiants incorrects' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});