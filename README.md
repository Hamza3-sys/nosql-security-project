# 🔐 NoSQL Security Project

## 📖 Description

Projet académique réalisé dans le cadre du module **NoSQL Security**.

L'objectif est d'explorer les bases de données NoSQL, en particulier MongoDB, tout en appliquant les principes de sécurité, de hardening, de développement sécurisé et d'analyse statique de code.

Les travaux pratiques couvrent :

* Fondamentaux MongoDB
* Sécurité par défaut et risques
* Hardening et RBAC
* NoSQL Injection
* Développement sécurisé
* Analyse SAST avec SonarQube

---

## 🛠️ Technologies Utilisées

| Technologie  | Utilisation           |
| ------------ | --------------------- |
| MongoDB 7    | Base de données NoSQL |
| Docker       | Conteneurisation      |
| Node.js      | Développement Backend |
| Express.js   | API REST              |
| SonarQube    | Analyse SAST          |
| SonarScanner | Analyse automatisée   |
| Git & GitHub | Gestion de version    |
| VS Code      | Développement         |

---

## 📂 Structure du Projet

```text
nosql-security-project/
│
├── README.md
├── .gitignore
├── docker-compose.yml
│
├── docs/
│   ├── architecture.md
│   ├── glossary.md
│   └── references.md
│
├── screenshots/
│   ├── TP1/
│   ├── TP2/
│   ├── TP3/
│   ├── TP4/
│   └── TP5/
│
├── TP1-MongoDB-Basics/
│   ├── README.md
│   └── captures/
│
├── TP2-Data-Security/
│   ├── README.md
│   └── captures/
│
├── TP3-MongoDB-Hardening/
│   ├── README.md
│   └── captures/
│
├── TP4-NoSQL-Injection/
│   ├── README.md
│   └── captures/
│
├── TP5-SAST-SonarQube/
│   ├── README.md
│   └── captures/
│
├── soc-api/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── server-safe.js
│   └── .env.example
│
└── docker/
    ├── mongodb/
    └── sonarqube/
```

---

## 🚀 Installation

### Prérequis

* Docker Desktop
* Node.js 18+
* Git
* VS Code

---

## 🐳 MongoDB Vulnérable

```bash
docker run -d \
--name mongo-noseclab \
-p 27017:27017 \
-v mongo-data:/data/db \
mongo:7
```

---

## 🛡️ MongoDB Sécurisé

```bash
docker run -d \
--name mongo_secure \
-p 127.0.0.1:27018:27017 \
-e MONGO_INITDB_ROOT_USERNAME=adminSoc \
-e MONGO_INITDB_ROOT_PASSWORD=Passw0rd_S3cure! \
mongo:7 --auth
```

---

## 🔍 SonarQube

```bash
docker run -d \
--name sonarqube \
-p 9000:9000 \
sonarqube:lts-community
```

Accès :

```text
http://localhost:9000
```

---

## ⚙️ API Node.js

Installation :

```bash
cd soc-api

npm install
```

API vulnérable :

```bash
node server.js
```

API sécurisée :

```bash
node server-safe.js
```

---

## 📚 Travaux Pratiques Réalisés

| TP  | Sujet                    | Statut |
| --- | ------------------------ | ------ |
| TP1 | MongoDB Basics & CRUD    | ✅      |
| TP2 | Data Security & Indexing | ✅      |
| TP3 | MongoDB Hardening & RBAC | ✅      |
| TP4 | NoSQL Injection          | ✅      |
| TP5 | SAST avec SonarQube      | ✅      |

---

## 🔒 Bonnes Pratiques de Sécurité

| Contrôle                      | Statut |
| ----------------------------- | ------ |
| Authentification MongoDB      | ✅      |
| RBAC                          | ✅      |
| Principe du moindre privilège | ✅      |
| Validation des entrées        | ✅      |
| Safe Filters MongoDB          | ✅      |
| Projection minimale           | ✅      |
| Variables d'environnement     | ✅      |
| Désactivation X-Powered-By    | ✅      |
| Analyse SAST                  | ✅      |

---

## 📊 Avancement

| TP  | Statut    |
| --- | --------- |
| TP1 | ✅ Terminé |
| TP2 | ✅ Terminé |
| TP3 | ✅ Terminé |
| TP4 | ✅ Terminé |
| TP5 | ✅ Terminé |

**Progression globale : 100%**

---

## 👨‍💻 Auteur

**Hamza MRANI ALAOUI**

Étudiant Ingénieur en Cybersécurité

EIDIA / EuroMed University

---

## 📅 Année Universitaire

**2025 - 2026**

---

## 📜 Licence

Projet académique réalisé dans le cadre du module **NoSQL Security**.
