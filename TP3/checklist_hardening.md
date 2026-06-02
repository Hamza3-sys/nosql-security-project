# 🔐 Checklist Hardening MongoDB — TP3

## 📌 Informations Générales

| Élément | Valeur |
|----------|----------|
| **Étudiant** | Hamza MRANI ALAOUI |
| **Module** | NoSQL Security |
| **Séance** | TP3 - MongoDB Hardening |
| **Date** | 02/06/2026 |

---

## 🧱 1. Configuration du conteneur

Vérification des paramètres de sécurité appliqués au déploiement MongoDB :

| Vérification | Statut |
|--------------|--------|
| Authentification activée (`--auth`) | ✅ OUI |
| Binding sur `127.0.0.1` uniquement | ✅ OUI |
| Port non exposé publiquement (`0.0.0.0`) | ✅ OUI (27018) |
| Variables d’environnement admin initial | ✅ OUI |

---

## 👤 2. Comptes utilisateurs créés

| Compte | Rôle | Base | Objectif |
|--------|------|------|----------|
| `adminSoc` | root | admin | Administration système |
| `soc_app` | readWrite | soc_lite | Application |
| `soc_analyst_ro` | read | soc_lite | Analyse des logs |
| `soc_manager` | incidentManager | soc_lite | Gestion des incidents |

---

## 🛡️ 3. Rôle personnalisé

Un rôle dédié a été créé pour limiter les privilèges sur la collection des incidents :

| Nom du rôle | Base | Permissions |
|-------------|------|-------------|
| `incidentManager` | `soc_lite` | find, insert, update, remove sur `incidents` |

---

## 🧪 4. Tests d’accès (Validation RBAC)

| Compte | Action | Résultat | Statut |
|--------|--------|----------|--------|
| Anonyme | `listDatabases` | Erreur d’authentification | ❌ Bloqué |
| `soc_analyst_ro` | Lecture logs | Succès | ✅ |
| `soc_analyst_ro` | Écriture logs | Refusé | ✅ |
| `soc_manager` | Lecture incidents | Succès | ✅ |
| `soc_manager` | Mise à jour incidents | Succès | ✅ |
| `soc_manager` | Lecture logs | Refusé | ✅ |
| `soc_app` | Écriture logs | Succès | ✅ |

---

## ⚠️ 5. Points d’amélioration identifiés

| Problème | Solution recommandée |
|----------|----------------------|
| `readWrite` trop permissif | Créer un rôle custom limité à certaines collections |
| `read` trop large (accès users) | Restreindre aux collections `logs` et `incidents` |
| Absence de segmentation fine | Implémenter RBAC plus granulaire |

---

## 📊 Conclusion

Ce TP a permis de :

- Activer et valider l’authentification MongoDB
- Mettre en place une architecture RBAC (Role-Based Access Control)
- Créer des rôles personnalisés adaptés au SOC
- Tester les restrictions d’accès
- Identifier les améliorations de sécurité possibles

L’approche adoptée renforce fortement la sécurité des données et limite les privilèges selon le principe du moindre privilège.

---

## 👨‍💻 Auteur

**Hamza MRANI ALAOUI**  
**Module :** NoSQL Security  
**TP :** MongoDB Hardening (TP3)  
**Date :** 02 Juin 2026
