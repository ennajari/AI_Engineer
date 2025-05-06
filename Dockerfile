# Utiliser l'image de base Python
FROM python:3.10-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier requirements.txt
COPY requirements.txt .

# Installer les dépendances
RUN apt-get update && apt-get install -y \
    build-essential \
    swig \
    libblas-dev \
    liblapack-dev && \
    pip install -r requirements.txt

# Copier le reste de l'application
COPY . .

# Commande pour démarrer l'application
CMD ["python", "app.py"]
