# 🛡️ Checklist Sécurité Data — TP2 (SOC-lite)

## 📌 Informations Générales

| Élément      | Valeur             |
| ------------ | ------------------ |
| **Étudiant** | Hamza MRANI ALAOUI |
| **Module**   | NoSQL Security     |
| **Séance**   | TP2 - SOC-lite     |
| **Date**     | 02/06/2026         |

---

## 🎯 Périmètre Fonctionnel

Les collections MongoDB utilisées dans le cadre du projet SOC-lite sont les suivantes :

| Collection      | Description                                |
| --------------- | ------------------------------------------ |
| `users`         | Gestion des utilisateurs du SOC            |
| `security_logs` | Stockage des journaux de sécurité bruts    |
| `incidents`     | Gestion des incidents de sécurité détectés |

---

## 🔒 Données Sensibles (PII)

Les informations personnelles identifiées dans la base de données sont :

| Champ       | Collection      | Niveau de Sensibilité |
| ----------- | --------------- | --------------------- |
| `email`     | `users`         | 🔴 Élevée             |
| `full_name` | `users`         | 🟠 Moyenne            |
| `raw_log`   | `security_logs` | 🔴 Très élevée        |

---

## ⚡ Optimisation des Requêtes

Les index suivants ont été créés afin d'améliorer les performances et la recherche des événements de sécurité :

| Index                    | Commande MongoDB                           |
| ------------------------ | ------------------------------------------ |
| Adresse IP source        | `createIndex({ src_ip: 1 })`               |
| Date + Adresse IP source | `createIndex({ timestamp: 1, src_ip: 1 })` |

---

## ✅ Vérifications de Sécurité Réalisées

| Contrôle                               | Statut     |
| -------------------------------------- | ---------- |
| Utilisation de projections MongoDB     | ✅ Conforme |
| Masquage des adresses e-mail           | ✅ Conforme |
| Restriction d'accès au champ `raw_log` | ✅ Conforme |
| Absence de sur-collecte de données     | ✅ Conforme |

---

## 📊 Résultat

Les bonnes pratiques de sécurité des données ont été appliquées :

* Protection des informations personnelles (PII)
* Réduction de l'exposition des données sensibles
* Optimisation des performances via les index
* Contrôle de l'accès aux journaux de sécurité
* Respect du principe du moindre privilège

---

**Auteur :** Hamza MRANI ALAOUI
**Date :** 02 Juin 2026
