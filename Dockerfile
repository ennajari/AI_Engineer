FROM python:3.10-slim

WORKDIR /app

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    build-essential \
    swig \
    && rm -rf /var/lib/apt/lists/*

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port
ENV PORT=5000
EXPOSE $PORT

# Démarrer l'application
CMD gunicorn --chdir web -b 0.0.0.0:$PORT api:api