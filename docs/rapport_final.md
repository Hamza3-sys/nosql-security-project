\# Rapport final - NoSQL Security



\## Introduction



Ce projet a été réalisé dans le cadre du module \*\*NoSQL Security\*\* de la formation Cybersécurité. L'objectif était de maîtriser les bases de données NoSQL (MongoDB) avec un focus sur la cybersécurité, en passant par la découverte, la modélisation, le hardening, les injections et l'analyse statique de code.



Le projet a été structuré en \*\*5 séances de travaux pratiques\*\*, chacune abordant un aspect différent de la sécurité NoSQL. Les TPs ont été réalisés sur \*\*Windows 11\*\* avec \*\*VS Code\*\*, \*\*Docker\*\*, \*\*Node.js\*\* et \*\*SonarQube\*\*.



\---



\## Technologies utilisées



| Technologie | Version | Utilisation |

|-------------|---------|-------------|

| \*\*MongoDB\*\* | 7.0 | Base de données NoSQL orientée documents |

| \*\*Docker\*\* | 29.3.1 | Conteneurisation des environnements (MongoDB, SonarQube) |

| \*\*Node.js\*\* | 20.11.0 | Runtime pour l'API Express |

| \*\*Express.js\*\* | 4.18.0 | Framework web pour l'API SOC |

| \*\*SonarQube\*\* | 9.9 LTS | Analyse statique de code (SAST) |

| \*\*mongosh\*\* | 2.8.2 | Shell interactif MongoDB |

| \*\*PowerShell\*\* | - | Terminal pour l'exécution des commandes |

| \*\*VS Code\*\* | - | Environnement de développement |



\---



\## Architecture des environnements



\### Architecture globale

┌─────────────────────────────────────────────────────────────────────────────┐

│ Machine locale (Windows) │

├─────────────────────────────────────────────────────────────────────────────┤

│ │

│ ┌────────────────────────────────────────────────────────────────────┐ │

│ │ Docker │ │

│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │ │

│ │ │ MongoDB │ │ MongoDB │ │ SonarQube │ │ │

│ │ │ insecure │ │ secure │ │ :9000 │ │ │

│ │ │ :27017 │ │ :27018 │ │ │ │ │

│ │ └──────────────┘ └──────────────┘ └──────────────┘ │ │

│ └────────────────────────────────────────────────────────────────────┘ │

│ │

│ ┌────────────────────────────────────────────────────────────────────┐ │

│ │ API Node.js (soc-api/) │ │

│ │ ┌──────────────────────┐ ┌──────────────────────┐ │ │

│ │ │ server.js │ │ server-safe.js │ │ │

│ │ │ (vulnérable) │ │ (corrigé) │ │ │

│ │ │ port :3000 │ │ port :3001 │ │ │

│ │ └──────────────────────┘ └──────────────────────┘ │ │

│ └────────────────────────────────────────────────────────────────────┘ │

│ │

└─────────────────────────────────────────────────────────────────────────────┘



text



\### Base de données soc\_lite



La base `soc\_lite` contient 3 collections :



| Collection | Rôle | Exemples de champs |

|------------|------|-------------------|

| \*\*users\*\* | Utilisateurs SOC | username, password, role |

| \*\*security\_logs\*\* | Logs de sécurité | ts, src\_ip, action, status, severity |

| \*\*incidents\*\* | Incidents de sécurité | incident\_id, title, severity, status |



\---



\## Description des TPs



\### TP1 - Découverte de NoSQL et MongoDB



\*\*Objectifs :\*\* Comprendre les différences SQL vs NoSQL, installer MongoDB avec Docker, réaliser des opérations CRUD.



\*\*Commandes clés :\*\*

```bash

\# Lancer MongoDB

docker run -d --name mongo-noseclab -p 27017:27017 -v mongo-data:/data/db mongo:7



\# Se connecter

docker exec -it mongo-noseclab mongosh



\# Insérer 12 documents de logs

db.security\_logs.insertMany(\[...])



\# Opérations CRUD

db.security\_logs.insertOne({...})

db.security\_logs.find({ status: "failure" })

db.security\_logs.updateOne({...}, {$set: {investigated: true}})

db.security\_logs.deleteOne({ user: "eve" })

Vulnérabilités identifiées :



Authentification désactivée



Port 27017 exposé sur 0.0.0.0



Binding réseau sur toutes les interfaces



Captures : 3 captures (docker ps, mongosh, countDocuments)



TP2 - Modélisation NoSQL et Index

Objectifs : Comprendre Embed vs Reference, créer des index, utiliser aggregation pipeline.



Patterns de modélisation appliqués :



Pattern	Exemple dans soc\_lite

Embed (One-to-Few)	Commentaires dans incidents

Reference (One-to-Many)	related\_log\_ids vers security\_logs

Time-series	security\_logs (append-only)

Commandes clés :



javascript

// Ajouter un commentaire (embed)

db.incidents.updateOne(

&#x20; { incident\_id: "INC-2025-001" },

&#x20; { $push: { comments: { author: "diana\_junior", text: "...", timestamp: new Date() } } }

)



// Créer un index

db.security\_logs.createIndex({ src\_ip: 1 })



// Aggregation - Top IPs sources

db.security\_logs.aggregate(\[

&#x20; { $group: { \_id: "$src\_ip", count: { $sum: 1 } } },

&#x20; { $sort: { count: -1 } },

&#x20; { $limit: 5 }

])

Captures : 9 captures (3 collections, index, aggregation)



TP3 - Hardening MongoDB (Authentification et RBAC)

Objectifs : Activer l'authentification, créer des utilisateurs avec rôles, appliquer le moindre privilège.



Configuration sécurisée :



bash

docker run -d --name mongo\_secure \\

&#x20; -p 127.0.0.1:27018:27017 \\

&#x20; -e MONGO\_INITDB\_ROOT\_USERNAME=adminSoc \\

&#x20; -e MONGO\_INITDB\_ROOT\_PASSWORD=Passw0rd\_S3cure! \\

&#x20; mongo:7

Comptes créés :



Compte	Rôle	Base d'auth	Droits

adminSoc	root	admin	Tous droits

soc\_app	readWrite	soc\_lite	Lecture/écriture sur toutes les collections

soc\_analyst\_ro	read	soc\_lite	Lecture seule

soc\_manager	incidentManager	soc\_lite	Gestion des incidents uniquement

Rôle personnalisé :



javascript

db.createRole({

&#x20; role: "incidentManager",

&#x20; privileges: \[

&#x20;   { resource: { db: "soc\_lite", collection: "incidents" }, 

&#x20;     actions: \["find", "insert", "update", "remove"] }

&#x20; ],

&#x20; roles: \[]

})

Tests d'accès :



Test	Résultat

Connexion anonyme	❌ Refusée

soc\_analyst\_ro lit logs	✅ Succès

soc\_analyst\_ro écrit logs	❌ Refusé

soc\_manager modifie incidents	✅ Succès

soc\_manager lit logs	❌ Refusé

Captures : 8 captures (admin créé, utilisateurs, tests autorisés/refusés)



TP4 - NoSQL Injection et Requêtes Sûres

Objectifs : Comprendre les injections NoSQL, reproduire des attaques contrôlées, appliquer les corrections.



Injections démontrées :



Injection	Opérateur	Effet

Contournement login	{"$ne":""}	Login réussi SANS mot de passe

Exfiltration logs	{"$regex":""}	Tous les logs exfiltrés

API vulnérable (server.js) :



javascript

// ❌ VULNÉRABLE

app.post('/logs/search', async (req, res) => {

&#x20; const results = await db.collection('security\_logs').find(req.body).toArray();

&#x20; res.json(results);

});

API corrigée (server-safe.js) :



javascript

// ✅ SÉCURISÉ

app.post('/logs/search', async (req, res) => {

&#x20; const safeFilter = {};

&#x20; 

&#x20; if (req.body.src\_ip !== undefined) {

&#x20;   if (!isValidIPv4(req.body.src\_ip))

&#x20;     return res.status(400).json({ error: 'src\_ip invalide' });

&#x20;   safeFilter.src\_ip = req.body.src\_ip;

&#x20; }

&#x20; 

&#x20; const results = await db.collection('security\_logs').find(safeFilter).toArray();

&#x20; res.json(results);

});

Projection minimale :



javascript

.project({ \_id: 0, ts: 1, src\_ip: 1, action: 1, status: 1 })

Captures : 11 captures (API vulnérable, injections, API corrigée, projection)



TP5 - SAST avec SonarQube

Objectifs : Installer SonarQube, analyser un code vulnérable, identifier et corriger les Security Hotspots.



Installation :



bash

docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community

Résultats de l'analyse :



Métrique	Avant correction	Après correction

Security Hotspots	2	0 ✅

Vulnerabilities	0	1

Code Smells	1	1

Hotspot détecté : Fingerprinting via l'en-tête X-Powered-By: Express



Correction appliquée :



javascript

const app = express();

app.disable('x-powered-by');   // ← Désactive l'en-tête HTTP

Limite identifiée : SonarQube n'a pas détecté les identifiants MongoDB en clair dans le code.



Captures : 8 captures (installation, analyse, hotspots, correction, re-analyse)



Mesures de sécurité appliquées

Sécurité infrastructure (TP3)

Mesure	Commande / Configuration

Authentification activée	--auth + variables d'environnement

Binding réseau limité	-p 127.0.0.1:27018:27017

Comptes avec moindre privilège	Rôles personnalisés (read, readWrite, incidentManager)

Séparation des comptes	adminSoc, soc\_app, soc\_analyst\_ro, soc\_manager

Sécurité applicative (TP4)

Mesure	Implémentation

Validation des types	typeof val !== 'string' → rejet

Validation des formats	Regex IPv4, email

safeFilter	Construction contrôlée champ par champ

Projection minimale	\_id:0, ts:1, src\_ip:1, action:1, status:1

Jamais find(req.body)	Extraction et validation explicites

Sécurité du code (TP5)

Mesure	Implémentation

Désactivation de l'en-tête fingerprinting	app.disable('x-powered-by')

Analyse statique régulière	SonarQube en CI/CD

Correction des Security Hotspots	Revue manuelle + re-analyse

Vulnérabilités étudiées

Vulnérabilité	TP	Description	Correction

Configuration par défaut	TP1	MongoDB sans authentification, port exposé	Activer --auth, limiter le binding

Injection NoSQL ($ne)	TP4	Contournement de login avec opérateur $ne	Validation des types + comparaison JS

Injection NoSQL ($regex)	TP4	Exfiltration de tous les logs avec regex vide	Validation des formats (IPv4)

Mass Assignment	TP4	Injection de champs non autorisés (role)	safeFilter + allow-list

Fingerprinting	TP5	En-tête X-Powered-By: Express	app.disable('x-powered-by')

Hardcoded Credentials	TP5	Identifiants MongoDB en clair dans le code	Variables d'environnement (.env)

Absence de projection	TP4	Exposition de champs sensibles (\_id, password\_hash)	Projection minimale

Difficultés rencontrées et solutions

Difficulté	Contexte	Solution

docker exec -it ne fonctionne pas sous PowerShell Admin	TP1, TP2	Utilisation de VS Code terminal

Commande mkdir -p non reconnue	PowerShell	Utilisation de New-Item -ItemType Directory -Force

mongosh non installé localement	TP1-TP5	Utilisation de docker exec -it mongo\_secure mongosh

map() ne fonctionne pas avec mongosh sur Windows	TP2	Utilisation de toArray() puis map()

curl sous PowerShell échappe mal les guillemets	TP4	Utilisation de Invoke-WebRequest (iwr)

SonarQube ne détecte pas les hardcoded credentials	TP5	Découverte manuelle + documentation de la limite

Pull rejected sur GitHub	TP1-TP5	git pull origin main --allow-unrelated-histories

node\_modules inclus dans git	TP4	Ajout de .gitignore

Conclusion

Ce projet a permis d'acquérir une vision complète de la sécurité NoSQL avec MongoDB, couvrant :



Les bases : installation, CRUD, modélisation document



Les performances : index, aggregation pipeline, explain()



Le hardening : authentification, RBAC, moindre privilège



Les attaques : injections NoSQL (

n

e

,

ne,regex, mass assignment)



Les corrections : validation des types, safeFilter, projection minimale



L'analyse statique : SonarQube, Security Hotspots



Principaux apprentissages

Enseignement	Importance

La configuration par défaut de MongoDB est dangereuse	Critique

L'authentification et le RBAC sont indispensables	Critique

Les injections NoSQL existent et sont différentes des injections SQL	Critique

La validation des types est la première ligne de défense	Élevée

SonarQube est utile mais insuffisant (faux négatifs)	Moyenne

La revue de code manuelle reste essentielle	Élevée

Perspectives d'amélioration

Utiliser Helmet.js pour sécuriser les en-têtes HTTP



Mettre en place un CI/CD avec analyse SonarQube automatique



Ajouter des tests d'intrusion automatisés



Implémenter le chiffrement TLS pour les communications MongoDB



Utiliser bcrypt pour le hachage des mots de passe



Annexes

Commandes utiles récapitulatives

bash

\# Lancer MongoDB insecure

docker run -d --name mongo-noseclab -p 27017:27017 -v mongo-data:/data/db mongo:7



\# Lancer MongoDB secure

docker run -d --name mongo\_secure -p 127.0.0.1:27018:27017 -e MONGO\_INITDB\_ROOT\_USERNAME=adminSoc -e MONGO\_INITDB\_ROOT\_PASSWORD=Passw0rd\_S3cure! mongo:7 --auth



\# Lancer SonarQube

docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community



\# Lancer API vulnérable

cd soc-api \&\& node server.js



\# Lancer API sécurisée

cd soc-api \&\& node server-safe.js



\# Analyser code avec SonarQube

docker run --rm -v "${PWD}:/usr/src" sonarsource/sonar-scanner-cli

Liens utiles

Documentation MongoDB



OWASP NoSQL Injection



SonarQube Rules



Date de fin du projet : 03/06/2026



Auteur : Hamza MRANI ALAOUI



Module : NoSQL Security - 1ère année Cybersécurité

