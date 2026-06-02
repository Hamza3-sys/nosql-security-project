# 🔐 Checklist Sécurité MongoDB — TP1

## 📌 Informations Générales

| Élément      | Valeur                        |
| ------------ | ----------------------------- |
| **Étudiant** | Hamza MRANI ALAOUI            |
| **Module**   | NoSQL Security                |
| **Séance**   | TP1 - MongoDB Security Basics |
| **Date**     | 02/06/2026                    |

---

## 🎯 Objectif du TP

L'objectif de ce TP est d'identifier les faiblesses de sécurité d'une instance MongoDB déployée avec sa configuration par défaut, puis d'effectuer des opérations CRUD et une première analyse des risques liés à l'absence de mécanismes de protection.

---

## 🔍 Vérification de la Configuration par Défaut

| Vérification             | Commande                                | Résultat                      | Statut    |
| ------------------------ | --------------------------------------- | ----------------------------- | --------- |
| Port MongoDB exposé      | `docker port mongo-noseclab`            | `0.0.0.0:27017`               | ⚠️ Ouvert |
| Authentification activée | `db.adminCommand({ listDatabases: 1 })` | Accès sans authentification   | ❌ Non     |
| Binding réseau           | `docker port mongo-noseclab`            | Toutes interfaces (`0.0.0.0`) | ⚠️ Risqué |
| Accès sans mot de passe  | Connexion directe au serveur            | Accès complet                 | ❌ Oui     |

### Observation

La configuration par défaut permet un accès total à la base de données sans authentification, ce qui constitue un risque critique dans un environnement de production.

---

## ⚙️ Commandes Réalisées

| Commande                                                                            | Objectif                    | Résultat              |
| ----------------------------------------------------------------------------------- | --------------------------- | --------------------- |
| `docker run -d --name mongo-noseclab -p 27017:27017 -v mongo-data:/data/db mongo:7` | Démarrer MongoDB            | ✅ Succès              |
| `docker exec -it mongo-noseclab mongosh`                                            | Connexion au shell MongoDB  | ✅ Succès              |
| `db.security_logs.insertMany([...])`                                                | Insertion des logs          | ✅ 12 documents        |
| `db.security_logs.countDocuments()`                                                 | Vérification de l'insertion | ✅ 12 documents        |
| `db.security_logs.find({ status: "failure" })`                                      | Recherche des échecs        | ✅ 6 résultats         |
| `db.security_logs.updateOne(...)`                                                   | Mise à jour d'un document   | ✅ 1 document modifié  |
| `db.security_logs.deleteOne({ user: "eve" })`                                       | Suppression d'un document   | ✅ 1 document supprimé |

---

## 📚 Opérations CRUD Réalisées

| Opération | MongoDB                        | SQL           |
| --------- | ------------------------------ | ------------- |
| Create    | `insertOne()` / `insertMany()` | `INSERT INTO` |
| Read      | `find()` / `findOne()`         | `SELECT`      |
| Update    | `updateOne()` / `updateMany()` | `UPDATE`      |
| Delete    | `deleteOne()` / `deleteMany()` | `DELETE`      |

---

## 🚀 Exemple de Requête Avancée

Recherche des événements de sévérité élevée ou critique avec projection, tri décroissant et limitation des résultats :

```javascript
db.security_logs.find(
  {
    severity: { $in: ["high", "critical"] }
  },
  {
    timestamp: 1,
    src_ip: 1,
    action: 1,
    severity: 1,
    _id: 0
  }
)
.sort({ timestamp: -1 })
.limit(3)
```

---

## ⚠️ Risques de Sécurité Identifiés

| # | Risque                       | Impact Potentiel                       |
| - | ---------------------------- | -------------------------------------- |
| 1 | Vol des journaux de sécurité | Exfiltration de données sensibles      |
| 2 | Suppression des preuves      | Effacement des traces d'attaque        |
| 3 | Ransomware                   | Chiffrement ou suppression des données |

### Analyse

L'absence d'authentification et l'exposition du service sur toutes les interfaces permettent à un attaquant de consulter, modifier ou supprimer les données sans restriction.

---

## 🛡️ Mesures Correctives Recommandées

| # | Mesure                      | Exemple                      |
| - | --------------------------- | ---------------------------- |
| 1 | Activer l'authentification  | `--auth`                     |
| 2 | Limiter l'exposition réseau | `127.0.0.1:27017:27017`      |
| 3 | Utiliser des rôles minimaux | Création d'utilisateurs RBAC |

### Exemple d'utilisateur restreint

```javascript
db.createUser({
  user: "analyst",
  pwd: "StrongPassword123!",
  roles: ["read"]
})
```

---

## 📊 Comparaison SQL vs NoSQL

| SQL           | MongoDB (NoSQL)                  |
| ------------- | -------------------------------- |
| Tables        | Collections                      |
| Lignes        | Documents                        |
| Colonnes      | Champs JSON                      |
| Schéma rigide | Schéma flexible                  |
| Jointures     | Références / Documents imbriqués |

---

## ✅ Conclusion

Ce TP a permis :

* D'identifier les vulnérabilités d'une configuration MongoDB par défaut.
* D'effectuer les opérations CRUD fondamentales.
* D'explorer les requêtes avancées MongoDB.
* De comprendre les principaux risques liés à une mauvaise configuration.
* De proposer des mesures de sécurisation conformes aux bonnes pratiques DevSecOps.

---

## 👨‍💻 Auteur

**Hamza MRANI ALAOUI**

**Module :** NoSQL Security
**TP :** MongoDB Security Basics (TP1)
**Date :** 02 Juin 2026
