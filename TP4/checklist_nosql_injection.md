\# 🛡️ TP4 - NoSQL Injection \& Requêtes Sûres



\## 📌 Objectifs



\- Comprendre le mécanisme des injections NoSQL (vs SQL Injection)

\- Reproduire deux types d’attaques :

&#x20; - `$ne` → contournement d’authentification

&#x20; - `$regex` → exfiltration de données

\- Corriger les vulnérabilités :

&#x20; - validation des types

&#x20; - construction de `safeFilter`

\- Mettre en place une projection minimale des données



\---



\## 🛠️ Technologies utilisées



\- Node.js + Express

\- MongoDB (container `mongo\_secure`)

\- PowerShell / Invoke-WebRequest

\- REST API



\---



\## 📁 Structure du projet



```text

TP4/

├── captures/                  # 11 captures d’écran

├── README.md                  # Documentation du TP

└── checklist\_nosql\_injection.md



soc-api/

├── package.json

├── server.js                  # API vulnérable (port 3000)

└── server-safe.js            # API corrigée (port 3001)

```



\---



\## 🧪 Résultats des tests



| # | Description | Résultat |

|---|-------------|----------|

| 0 | Peuplement base `soc\_lite` | ✅ 3 users, 6 logs |

| 1 | Lancement API vulnérable | ✅ Port 3000 |

| 2 | Login valide (alice/motdepasse123) | ✅ Success |

| 3 | Recherche logs par IP | ✅ OK |

| 4 | Injection `$ne` | ⚠️ Contournement réussi |

| 5 | Injection `$regex` | ⚠️ Exfiltration complète |

| 6 | Lancement API sécurisée | ✅ Port 3001 |

| 7 | Injection `$ne` bloquée | ❌ 400 - type invalide |

| 8 | Injection `$regex` bloquée | ❌ 400 - format IP requis |

| 9 | Login valide sécurisé | ✅ Success |

| 10 | Projection minimale | ✅ Champs sensibles masqués |



\---



\## 🔒 Checklist de sécurité appliquée



| Règle | Statut |

|------|--------|

| Validation stricte des types (`typeof string`) | ✅ |

| Validation des formats (IPv4 / email) | ✅ |

| Utilisation de `safeFilter` | ✅ |

| Interdiction de `find(req.body)` | ✅ |

| Interdiction de requêtes directes login | ✅ |

| Projection minimale (`\_id: 0, ts: 1, src\_ip: 1`) | ✅ |



\---



\## 📸 Captures d’écran



| Fichier | Description |

|--------|-------------|

| capture0.png | Comptage DB (`users = 3`, `logs = 6`) |

| capture1.png | API vulnérable (port 3000) |

| capture2.png | Login valide |

| capture3.png | Recherche logs IP |

| capture4.png | Injection `$ne` réussie |

| capture5.png | Injection `$regex` réussie |

| capture6.png | API sécurisée (port 3001) |

| capture7.png | `$ne` bloqué |

| capture8.png | `$regex` bloqué |

| capture9.png | Login sécurisé OK |

| capture10.png | Projection minimale active |



\---



\## 🚀 Commandes importantes



\### ▶️ Lancer API vulnérable



```bash

cd soc-api

node server.js

```



\---



\### 🔐 Lancer API sécurisée



```bash

node server-safe.js

```



\---



\### 🧪 Test PowerShell



```powershell

iwr -Uri http://localhost:3000/auth/login `

\-Method POST `

\-Headers @{"Content-Type"="application/json"} `

\-Body '{"username":"alice","password":"motdepasse123"}' |

Select-Object -ExpandProperty Content

```



\---



\## 📅 Date



02/06/2026



\---



\## 👨‍💻 Auteur



\*\*Hamza MRANI ALAOUI\*\*

