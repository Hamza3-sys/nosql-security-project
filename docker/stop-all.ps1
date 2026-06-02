# Script pour arrêter tous les conteneurs

Write-Host "=== Arrêt des conteneurs ===" -ForegroundColor Yellow

docker stop mongo-noseclab 2>$null
docker stop mongo_secure 2>$null
docker stop sonarqube 2>$null

Write-Host "=== Conteneurs arrêtés ===" -ForegroundColor Green