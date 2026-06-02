\# NoSQL Security Project



\## 📌 Description

Projet réalisé dans le cadre du module \*\*NoSQL Security\*\*.

L'objectif est de maîtriser les bases de données NoSQL (MongoDB) avec un focus sur la cybersécurité.



\## 🛠 Technologies utilisées

\- \*\*MongoDB 7\*\* - Base de données NoSQL orientée documents

\- \*\*Docker\*\* - Conteneurisation de l'environnement

\- \*\*Node.js + Express\*\* - API REST pour les démonstrations

\- \*\*SonarQube\*\* - Analyse statique de code (SAST)

\- \*\*mongosh\*\* - Shell interactif MongoDB



\## 📁 Structure du projet

nosql-security-project/

├── TP1/ # Découverte de NoSQL et MongoDB

├── TP2/ # Modélisation, Index, Aggregation

├── TP3/ # Hardening (Authentification, RBAC)

├── TP4/ # NoSQL Injection et Requêtes sûres

├── TP5/ # SAST avec SonarQube

├── docker/ # Fichiers Docker

├── screenshots/ # Captures globales

├── docs/ # Documentation

├── soc-api/ # API Node.js (TP4 et TP5)

├── docker-compose.yml # Orchestration Docker

├── README.md # Ce fichier

└── requirements.txt # Dépendances



text



\## 🚀 Installation et lancement



\### Prérequis

\- Docker Desktop installé

\- Node.js 18+ installé

\- VS Code (recommandé)



\### Lancer MongoDB (version insecure)

```bash

docker run -d --name mongo-noseclab -p 27017:27017 -v mongo-data:/data/db mongo:7

Lancer MongoDB (version sécurisée)

bash

docker run -d --name mongo-secure -p 127.0.0.1:27018:27017 -e MONGO\_INITDB\_ROOT\_USERNAME=adminSoc -e MONGO\_INITDB\_ROOT\_PASSWORD=Passw0rd\_S3cure! mongo:7 --auth

Lancer SonarQube

bash

docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community

Lancer l'API Node.js

bash

cd soc-api

npm install

node server.js          # API vulnérable (port 3000)

\# ou

node server-safe.js     # API sécurisée (port 3001)

📚 TPs réalisés

TP	Sujet	Description

TP1	Découverte NoSQL	CRUD, modélisation document, sécurité par défaut

TP2	Modélisation \& Index	Embed/Reference, aggregation pipeline, explain()

TP3	Hardening	Authentification, RBAC, moindre privilège

TP4	NoSQL Injection	Injections 

n

e

,

ne,regex, safeFilter, projection

TP5	SAST	SonarQube, Security Hotspots, correction

🔒 Sécurité - Règles d'or

Règle	Description

✅	Activer l'authentification MongoDB (--auth)

✅	Limiter le binding réseau (127.0.0.1)

✅	Utiliser des variables d'environnement (pas d'identifiants en clair)

✅	Jamais find(req.body) - utiliser safeFilter

✅	Toujours projeter les champs nécessaires

✅	Valider les types des entrées utilisateur

✅	Désactiver l'en-tête X-Powered-By

📊 Avancement

TP	Statut	Captures

TP1	✅ Terminé	3

TP2	✅ Terminé	9

TP3	✅ Terminé	8

TP4	✅ Terminé	11

TP5	✅ Terminé	8

👤 Auteur

Hamza MRANI ALAOUI - hamza.mranialaoui@eidia.ueuromed .org



📅 Date

Juin 2026

