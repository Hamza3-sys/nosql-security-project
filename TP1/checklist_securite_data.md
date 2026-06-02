# Checklist Sécurité Data — SOC-lite

| # | Vérification | Statut |
|---|--------------|--------|
| 1 | Périmètre fonctionnel par collection | users, security_logs, incidents |
| 2 | PII identifiés | email, full_name, raw_log |
| 3 | Projections définies par rôle | viewer: sans raw_log ni email |
| 4 | Champs haute sensibilité (raw_log) | accès restreint |
| 5 | Pas de sur-collecte | ✅ |
| 6 | Masquage des emails | à faire |