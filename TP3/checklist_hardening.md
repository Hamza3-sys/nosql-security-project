\# Checklist Hardening MongoDB — TP3



\## Informations

\- \*\*Date\*\* : 02/06/2026

\- \*\*Module\*\* : NoSQL Security - Séance 3



\---



\## 1. Configuration du conteneur



| Vérification | Statut |

|--------------|--------|

| Authentification activée (`--auth`) | ✅ OUI |

| Binding sur 127.0.0.1 uniquement | ✅ OUI |

| Port non exposé sur 0.0.0.0 | ✅ OUI (27018) |

| Variables d'environnement pour admin initial | ✅ OUI |



\---



\## 2. Comptes créés



| Compte | Rôle | Base d'auth | Objectif |

|--------|------|-------------|----------|

| adminSoc | root | admin | Administration |

| soc\_app | readWrite | soc\_lite | Application |

| soc\_analyst\_ro | read | soc\_lite | Lecture logs |

| soc\_manager | incidentManager | soc\_lite | Gestion incidents |



\---



\## 3. Rôle personnalisé créé



| Nom | Base | Privileges |

|-----|------|------------|

| incidentManager | soc\_lite | incidents: find, insert, update, remove |



\---



\## 4. Tests d'accès



| Compte | Opération | Résultat | Statut |

|--------|-----------|----------|--------|

| Anonyme | listDatabases | Erreur auth | ✅ |

| soc\_analyst\_ro | Lecture logs | Succès | ✅ |

| soc\_analyst\_ro | Écriture logs | Refusé | ✅ |

| soc\_manager | Lecture incidents | Succès | ✅ |

| soc\_manager | Mise à jour incidents | Succès | ✅ |

| soc\_manager | Lecture logs | Refusé | ✅ |

| soc\_app | Écriture logs | Succès | ✅ |



\---



\## 5. Points d'amélioration identifiés



| Problème | Solution |

|----------|----------|

| readWrite donne accès à toutes les collections | Créer un rôle personnalisé pour soc\_app |

| read donne accès à users | Créer un rôle personnalisé limité à logs + incidents |



\---



\## 6. Signature



\*\*Étudiant\*\* : \[VOTRE NOM]

\*\*Date\*\* : 02/06/2026

