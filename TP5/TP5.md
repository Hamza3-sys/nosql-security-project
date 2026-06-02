\# TP5 - Static Application Security Testing (SAST) avec SonarQube



\## 📌 Objectifs du TP



\- Comprendre ce qu'est le SAST (Static Application Security Testing)

\- Installer et configurer SonarQube avec Docker

\- Analyser un code Node.js vulnérable (API SOC)

\- Identifier les Security Hotspots et vulnérabilités

\- Corriger les problèmes détectés

\- Valider les corrections par une nouvelle analyse



\---



\## 🛠 Technologies utilisées



| Technologie | Version | Rôle |

|-------------|---------|------|

| SonarQube | 9.9 LTS | Analyse statique de code |

| Docker | 29.3.1 | Conteneurisation de SonarQube |

| SonarScanner | 8.0.1 | Scanner CLI pour l'analyse |

| Node.js | 20.11.0 | Runtime de l'API analysée |

| Express.js | 4.18.0 | Framework web |



\---



\## 🏗 Architecture du TP

┌─────────────────────────────────────────────────────────────────┐

│ Machine locale │

├─────────────────────────────────────────────────────────────────┤

│ │

│ ┌──────────────┐ ┌──────────────────────────────┐ │

│ │ Docker │ │ Code Source (Node.js) │ │

│ │ │ │ │ │

│ │ ┌────────┐ │ │ ┌────────────────────────┐ │ │

│ │ │SonarQube│◄─┼─────────┼──│ server.js (vulnérable) │ │ │

│ │ │ :9000 │ │ Analyse │ │ server-safe.js (corrigé)│ │ │

│ │ └────────┘ │ │ └────────────────────────┘ │ │

│ │ │ │ │ │

│ └──────────────┘ │ ┌────────────────────────┐ │ │

│ │ │ MongoDB (soc\_lite) │ │ │

│ │ │ - users │ │ │

│ │ │ - security\_logs │ │ │

│ │ │ - incidents │ │ │

│ │ └────────────────────────┘ │ │

│ └──────────────────────────────┘ │

└─────────────────────────────────────────────────────────────────┘



text



\---



\## 📊 Résultats de l'analyse



\### Première analyse (server.js - vulnérable)



| Métrique | Valeur | Statut |

|----------|--------|--------|

| \*\*Bugs\*\* | 0 | ✅ |

| \*\*Vulnerabilities\*\* | 0 | ⚠️ |

| \*\*Security Hotspots\*\* | 2 | ⚠️ À corriger |

| \*\*Code Smells\*\* | 1 | ⚠️ |

| \*\*Quality Gate\*\* | PASSED | ✅ |



\### Security Hotspots détectés



| # | Type | Fichier | Description | Sévérité |

|---|------|---------|-------------|----------|

| 1 | `javascript:S5689` | server.js | Disclosing fingerprinting (X-Powered-By) | Medium |

| 2 | `javascript:S5689` | server.js | Disclosing fingerprinting (X-Powered-By) | Medium |



\---



\### Deuxième analyse (server-safe.js - corrigé)



| Métrique | Valeur | Statut |

|----------|--------|--------|

| \*\*Bugs\*\* | 0 | ✅ |

| \*\*Vulnerabilities\*\* | 1 | ⚠️ (hardcoded credentials) |

| \*\*Security Hotspots\*\* | 0 | ✅ CORRIGÉ |

| \*\*Code Smells\*\* | 1 | ⚠️ |

| \*\*Quality Gate\*\* | PASSED | ✅ |



\---



\## 🔧 Corrections apportées



\### Correction 1 : Désactivation de l'en-tête X-Powered-By



\*\*Fichier :\*\* `server-safe.js`



\*\*Code avant (vulnérable) :\*\*

```javascript

const app = express();

Code après (corrigé) :



javascript

const app = express();

app.disable('x-powered-by');   // ← Désactive l'en-tête HTTP

Pourquoi ? L'en-tête X-Powered-By: Express révèle la technologie utilisée, facilitant le ciblage par les attaquants.



Vulnérabilité persistante (non corrigée dans ce TP)

Problème	Ligne	Risque	Solution

Hardcoded credentials	12	Identifiants MongoDB en clair dans le code	Utiliser des variables d'environnement (.env)

javascript

// 🔴 Actuel (dangereux)

const URI = 'mongodb://adminSoc:Passw0rd\_S3cure!@localhost:27018/soc\_lite?authSource=admin';



// ✅ Recommandé (sécurisé)

require('dotenv').config();

const URI = `mongodb://${process.env.DB\_USER}:${process.env.DB\_PASSWORD}@${process.env.DB\_HOST}/${process.env.DB\_NAME}?authSource=${process.env.DB\_AUTH\_SOURCE}`;

📸 Captures d'écran

\#	Fichier	Description

1	capture1.png	Création du projet "soc-api-vulnerable"

2	capture2.png	Génération du token d'analyse

3	capture3.png	Première analyse (EXECUTION SUCCESS)

4	capture4.png	Tableau de bord - 2 Security Hotspots

5	capture5.png	Détail d'un Security Hotspot (fingerprinting)

6	capture6.png	Code corrigé avec app.disable('x-powered-by')

7	capture7.png	Deuxième analyse (EXECUTION SUCCESS)

8	capture8.png	Tableau de bord final - 0 Security Hotspots

🚀 Commandes exécutées

Lancer SonarQube

bash

docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community

Accéder à SonarQube

URL : http://localhost:9000



Identifiant : admin



Mot de passe : admin (puis modifier)



Créer le projet

Project key : soc-api-vulnerable



Display name : SOC API - Vulnerable



Générer le token

Token : sqp\_498fcf7135bb7f0556891a7fc219bbe5f7bc08eb



Analyser le code

bash

cd C:\\Users\\hp\\nosql-security-project\\soc-api



\# Première analyse (server.js)

docker run --rm -v "${PWD}:/usr/src" sonarsource/sonar-scanner-cli



\# Après correction (server-safe.js)

docker run --rm -v "${PWD}:/usr/src" sonarsource/sonar-scanner-cli

📊 Récapitulatif des apprentissages

Concept	Compris

Qu'est-ce que le SAST ?	✅

Installation de SonarQube	✅

Création d'un projet d'analyse	✅

Lecture des métriques (Bugs, Vulnérabilités, Hotspots)	✅

Interprétation des Security Hotspots	✅

Correction des problèmes détectés	✅

Re-analyse et validation	✅

Limites de SonarQube (hardcoded credentials non détectés)	✅

🎓 Bilan et enseignements

Points positifs de SonarQube

✅ Installation simple via Docker



✅ Interface claire et intuitive



✅ Détection des Security Hotspots (fingerprinting)



✅ Intégration facile dans un pipeline CI/CD



Limites de SonarQube

❌ N'a pas détecté les identifiants MongoDB en clair (hardcoded credentials)



❌ N'a pas détecté les potentielles injections NoSQL



❌ La version Community a moins de règles que la version Developer



Conclusion

SonarQube est un outil utile mais insuffisant. Il doit être complété par :



Une revue de code manuelle



Des tests d'intrusion



Une analyse de sécurité humaine



Des bonnes pratiques de développement (variables d'environnement, validation des entrées)



📅 Informations

Élément	Valeur

Date de réalisation	02/06/2026

Module	NoSQL Security - Séance 5

Auteur	Hamza MRANI ALAOUI

