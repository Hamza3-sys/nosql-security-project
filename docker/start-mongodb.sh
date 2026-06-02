#!/bin/bash
# Script de démarrage pour MongoDB

echo "=== Démarrage des conteneurs MongoDB ==="

# MongoDB insecure (pour TP1, TP2, TP4)
docker run -d --name mongo-noseclab \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:7

# MongoDB secure (pour TP3, TP4, TP5)
docker run -d --name mongo_secure \
  -p 127.0.0.1:27018:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=adminSoc \
  -e MONGO_INITDB_ROOT_PASSWORD=Passw0rd_S3cure! \
  -v mongo-secure-data:/data/db \
  mongo:7 --auth

echo "=== Conteneurs démarrés ==="
docker ps | grep mongo