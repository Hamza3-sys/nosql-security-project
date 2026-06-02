\# Checklist Sécurité Data — TP2 (SOC-lite)



\## Informations

\- \*\*Date\*\* : 02/06/2026

\- \*\*Module\*\* : NoSQL Security - Séance 2



\---



\## 1. Périmètre fonctionnel par collection



| Collection | Rôle |

|------------|------|

| users | Gestion des utilisateurs SOC |

| security\_logs | Stockage des logs bruts |

| incidents | Gestion des incidents de sécurité |



\---



\## 2. PII identifiés



| Champ | Collection | Sensibilité |

|-------|------------|-------------|

| email | users | Élevée |

| full\_name | users | Moyenne |

| raw\_log | security\_logs | Très élevée |



\---



\## 3. Index créés



| Index | Commande |

|-------|----------|

| src\_ip | `createIndex({ src\_ip: 1 })` |

| timestamp + src\_ip | `createIndex({ timestamp: 1, src\_ip: 1 })` |



\---



\## 4. Vérifications effectuées



| Vérification | Statut |

|--------------|--------|

| Projections utilisées | ✅ Oui |

| Masquage des emails | ✅ Fait |

| raw\_log restreint | ✅ Oui |

| Pas de sur-collecte | ✅ |



\---



\*\*Étudiant\*\* : Hamza MRANI ALAOUI

\*\*Date\*\* : 02/06/2026

