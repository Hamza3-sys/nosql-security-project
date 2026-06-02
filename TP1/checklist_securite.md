markdown

\# Checklist Sécurité MongoDB — TP1



\## Informations

\- \*\*Date\*\* : 02/06/2026

\- \*\*Module\*\* : NoSQL Security - Séance 1

\- \*\*Étudiant\*\* : \[VOTRE NOM]



\---



\## 1. Vérifications de la configuration par défaut



| Vérification | Commande | Résultat | Statut |

|--------------|----------|----------|--------|

| Port 27017 ouvert | `docker port mongo-noseclab` | 0.0.0.0:27017 | ⚠️ Ouvert |

| Authentification activée | `docker exec mongo-noseclab mongosh --eval "db.adminCommand({ listDatabases: 1 })"` | Accès sans mot de passe | ❌ NON |

| Binding réseau | `docker port mongo-noseclab` | 0.0.0.0 | ⚠️ Toutes interfaces |

| Accès sans mot de passe | Même commande | Accès total | ❌ OUI |



\---



\## 2. Commandes exécutées



| Commande | Objectif | Résultat |

|----------|----------|----------|

| `docker run -d --name mongo-noseclab -p 27017:27017 -v mongo-data:/data/db mongo:7` | Lancer MongoDB | ✅ Succès |

| `docker exec -it mongo-noseclab mongosh` | Connexion au shell | ✅ Succès |

| `db.security\_logs.insertMany(\[...])` | Insérer 12 logs | ✅ 12 documents |

| `db.security\_logs.countDocuments()` | Vérifier insertion | ✅ 12 |

| `db.security\_logs.find({ status: "failure" })` | Lire échecs | ✅ 6 documents |

| `db.security\_logs.updateOne({...}, {$set: {investigated: true}})` | Mettre à jour | ✅ 1 modifié |

| `db.security\_logs.deleteOne({ user: "eve" })` | Supprimer | ✅ 1 supprimé |



\---



\## 3. Opérations CRUD réalisées



| Opération | Commande MongoDB | Équivalent SQL |

|-----------|-----------------|----------------|

| Create | `insertOne()` / `insertMany()` | `INSERT INTO` |

| Read | `find()` / `findOne()` | `SELECT` |

| Update | `updateOne()` / `updateMany()` | `UPDATE` |

| Delete | `deleteOne()` / `deleteMany()` | `DELETE` |



\---



\## 4. Requêtes avancées réalisées



```javascript

// Requête avec projection et tri

db.security\_logs.find(

&#x20; { severity: { $in: \["high", "critical"] } },

&#x20; { timestamp: 1, src\_ip: 1, action: 1, severity: 1, \_id: 0 }

).sort({ timestamp: -1 }).limit(3)

5\. 3 risques concrets identifiés

\#	Risque	Impact

1	Vol des logs de sécurité	Un attaquant peut exporter tous les logs

2	Effacement des preuves	deleteMany({}) supprime toutes les traces

3	Ransomware	Suppression des données + demande rançon

6\. 3 mesures correctives immédiates

\#	Mesure	Commande

1	Activer l'authentification	docker run --auth -e MONGO\_INITDB\_ROOT\_USERNAME=admin -e MONGO\_INITDB\_ROOT\_PASSWORD=...

2	Limiter le binding	-p 127.0.0.1:27017:27017

3	Créer utilisateur avec rôles	db.createUser({ user: "analyst", pwd: "...", roles: \["read"] })

7\. Différences SQL vs NoSQL (à retenir)

SQL	NoSQL (MongoDB)

Tables	Collections

Lignes	Documents

Colonnes	Champs JSON

Schéma rigide	Schéma flexible

Jointures	Embed / Reference

8\. Signature

Étudiant : \[VOTRE NOM]

Date de fin TP1 : 02/06/2026

