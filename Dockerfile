# Utilisation de l'image Python 3.12 slim
FROM python:3.12-slim

# Mise à jour et installation de swig, build-essential, et d'autres outils nécessaires
RUN apt-get update && apt-get install -y \
    swig \
    build-essential \
    libopenblas-dev \
    liblapack-dev \
    libatlas-base-dev \
    python3-dev \
    git \
    cmake

# Création d'un environnement virtuel
RUN python -m venv /opt/venv

# Activation de l'environnement virtuel
ENV PATH="/opt/venv/bin:$PATH"

# Copie des fichiers de l'application
COPY . /app
WORKDIR /app

# Installation des dépendances à partir du fichier requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Exposition du port 5000 pour Flask
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["python", "web/api.py"]
