# 🔍 TP5 - Static Application Security Testing (SAST) avec SonarQube

## 📌 Présentation

Dans ce TP, nous avons mis en œuvre une analyse SAST (Static Application Security Testing) afin d'identifier les vulnérabilités potentielles dans une application Node.js développée lors des précédents travaux pratiques.

L'objectif principal était d'utiliser SonarQube pour analyser un code vulnérable, interpréter les résultats obtenus, corriger les problèmes détectés puis valider les corrections par une nouvelle analyse.

---

## 🎯 Objectifs

* Comprendre le fonctionnement du SAST
* Installer SonarQube avec Docker
* Configurer SonarScanner
* Analyser une API Node.js vulnérable
* Identifier les Security Hotspots
* Corriger les problèmes détectés
* Réaliser une seconde analyse de validation

---

## 🛠️ Technologies utilisées

| Technologie  | Version | Rôle                     |
| ------------ | ------- | ------------------------ |
| SonarQube    | 9.9 LTS | Analyse statique du code |
| Docker       | 29.3.1  | Conteneurisation         |
| SonarScanner | 8.0.1   | Analyse du code source   |
| Node.js      | 20.11.0 | Runtime JavaScript       |
| Express.js   | 4.18.0  | Framework Web            |
| MongoDB      | 7       | Base de données NoSQL    |

---

## 🏗️ Architecture du TP

```text
┌───────────────────────────────────────────┐
│             Machine Locale                │
├───────────────────────────────────────────┤
│                                           │
│  Docker                                   │
│  ┌─────────────────────────────────────┐  │
│  │ SonarQube (Port 9000)               │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  Code Source                             │
│  ┌─────────────────────────────────────┐  │
│  │ server.js (vulnérable)              │  │
│  │ server-safe.js (corrigé)            │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  MongoDB (soc_lite)                      │
│  ├── users                              │
│  ├── security_logs                      │
│  └── incidents                          │
│                                           │
└───────────────────────────────────────────┘
```

---

## 🚀 Déploiement de SonarQube

### Lancement du conteneur

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```

### Accès à l'interface

```text
URL : http://localhost:9000
Login : admin
Password : admin
```

Le mot de passe doit être modifié lors de la première connexion.

---

## 📂 Création du projet SonarQube

| Paramètre    | Valeur               |
| ------------ | -------------------- |
| Project Key  | soc-api-vulnerable   |
| Display Name | SOC API - Vulnerable |

Après la création du projet, un token d'analyse a été généré afin d'autoriser SonarScanner à envoyer les résultats vers SonarQube.

---

## 🔎 Première Analyse (Code Vulnérable)

### Fichier analysé

```text
server.js
```

### Résultats

| Métrique          | Valeur | Statut |
| ----------------- | ------ | ------ |
| Bugs              | 0      | ✅      |
| Vulnerabilities   | 0      | ⚠️     |
| Security Hotspots | 2      | ⚠️     |
| Code Smells       | 1      | ⚠️     |
| Quality Gate      | PASSED | ✅      |

---

## ⚠️ Security Hotspots Détectés

| Règle            | Description                                   | Sévérité |
| ---------------- | --------------------------------------------- | -------- |
| javascript:S5689 | Disclosure de fingerprinting via X-Powered-By | Medium   |
| javascript:S5689 | Disclosure de fingerprinting via X-Powered-By | Medium   |

### Explication

Par défaut, Express ajoute l'en-tête HTTP suivant :

```http
X-Powered-By: Express
```

Cet en-tête révèle la technologie utilisée par l'application et facilite le travail d'un attaquant lors de la phase de reconnaissance.

---

## 🔧 Correction Apportée

### Avant

```javascript
const app = express();
```

### Après

```javascript
const app = express();

app.disable('x-powered-by');
```

### Bénéfice

La suppression de cet en-tête réduit les informations divulguées aux attaquants et limite les possibilités de fingerprinting.

---

## 🔎 Deuxième Analyse (Code Corrigé)

### Fichier analysé

```text
server-safe.js
```

### Résultats

| Métrique          | Valeur | Statut |
| ----------------- | ------ | ------ |
| Bugs              | 0      | ✅      |
| Vulnerabilities   | 1      | ⚠️     |
| Security Hotspots | 0      | ✅      |
| Code Smells       | 1      | ⚠️     |
| Quality Gate      | PASSED | ✅      |

---

## 🚨 Vulnérabilité Persistante

### Hardcoded Credentials

SonarQube a signalé la présence d'identifiants directement intégrés dans le code.

### Exemple vulnérable

```javascript
const URI =
'mongodb://adminSoc:Passw0rd_S3cure!@localhost:27018/soc_lite?authSource=admin';
```

### Bonne pratique recommandée

```javascript
require('dotenv').config();

const URI =
`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=${process.env.DB_AUTH_SOURCE}`;
```

### Avantages

* Séparation du code et des secrets
* Réduction du risque de fuite
* Compatible CI/CD et DevSecOps

---

## 📸 Captures Réalisées

| Capture      | Description                            |
| ------------ | -------------------------------------- |
| capture1.png | Création du projet SonarQube           |
| capture2.png | Génération du token                    |
| capture3.png | Première analyse réussie               |
| capture4.png | Dashboard avec 2 Security Hotspots     |
| capture5.png | Détail d'un Security Hotspot           |
| capture6.png | Code corrigé                           |
| capture7.png | Deuxième analyse réussie               |
| capture8.png | Dashboard final sans Security Hotspots |

---

## ⚙️ Commandes Utilisées

### Analyse du projet

```bash
cd soc-api

docker run --rm \
-v "${PWD}:/usr/src" \
sonarsource/sonar-scanner-cli
```

Après correction :

```bash
docker run --rm \
-v "${PWD}:/usr/src" \
sonarsource/sonar-scanner-cli
```

---

## 📚 Apprentissages Réalisés

| Compétence                      | Acquise |
| ------------------------------- | ------- |
| Comprendre le SAST              | ✅       |
| Installer SonarQube             | ✅       |
| Configurer SonarScanner         | ✅       |
| Lire les métriques de sécurité  | ✅       |
| Analyser les Security Hotspots  | ✅       |
| Corriger les problèmes détectés | ✅       |
| Valider les corrections         | ✅       |
| Comprendre les limites du SAST  | ✅       |

---

## ⚖️ Avantages et Limites de SonarQube

### Points forts

* ✅ Installation simple via Docker
* ✅ Interface graphique intuitive
* ✅ Détection des Security Hotspots
* ✅ Intégration facile dans un pipeline CI/CD
* ✅ Support de nombreux langages

### Limites observées

* ❌ Certaines vulnérabilités applicatives restent non détectées
* ❌ Les injections NoSQL ne sont pas toujours identifiées
* ❌ Les hardcoded credentials nécessitent parfois des règles supplémentaires
* ❌ La version Community dispose de moins de fonctionnalités que les éditions payantes

---

## 🎓 Conclusion

SonarQube constitue un excellent outil d'analyse statique et permet d'identifier rapidement plusieurs faiblesses de sécurité dans une application.

Cependant, il ne remplace pas :

* Une revue de code manuelle
* Les tests d'intrusion
* Les audits de sécurité
* Les bonnes pratiques de développement sécurisé

Une stratégie DevSecOps efficace combine plusieurs couches de contrôle afin de réduire les risques de sécurité tout au long du cycle de développement.

---

## 👨‍💻 Auteur

**Hamza MRANI ALAOUI**

| Élément         | Valeur                    |
| --------------- | ------------------------- |
| Module          | NoSQL Security            |
| TP              | TP5 - SAST avec SonarQube |
| Date            | 02/06/2026                |
| Outil principal | SonarQube 9.9 LTS         |
