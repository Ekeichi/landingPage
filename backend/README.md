# Backend Kairos Zero

API FastAPI pour la landing page Kairos Zero.

## 🚀 Installation

1. **Installer les dépendances** :
```bash
cd backend
uv sync
```

2. **Configuration** :
Créer un fichier `.env` à la racine du backend :
```env
DATABASE_URL=sqlite:///./kairos_beta.db
ENVIRONMENT=development
DEBUG=true
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

3. **Lancer le serveur** :
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Une fois le serveur lancé, accédez à :
- **Swagger UI** : http://localhost:8000/docs
- **ReDoc** : http://localhost:8000/redoc

## 🔗 Endpoints

### Inscription
- `POST /api/v1/signup`
- Body : `{"email": "user@example.com"}`

### Contact
- `POST /api/v1/contact`
- Body : `{"name": "John Doe", "email": "john@example.com", "message": "Hello", "subject": "Question"}`

## 🗄️ Base de données

- **Type** : SQLite (par défaut)
- **Fichier** : `kairos_beta.db`
- **Tables** : `users`

Les tables sont créées automatiquement au démarrage de l'application.

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `DATABASE_URL` | URL de la base de données | `sqlite:///./kairos_beta.db` |
| `ENVIRONMENT` | Environnement (development/production) | `development` |
| `DEBUG` | Mode debug | `true` |
| `ALLOWED_ORIGINS` | Origines CORS autorisées | `http://localhost:5173,http://localhost:3000` |

## 🛠️ Développement

### Structure du projet
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # Point d'entrée FastAPI
│   ├── database.py      # Configuration DB
│   ├── models.py        # Modèles SQLAlchemy
│   ├── schemas.py       # Schémas Pydantic
│   └── routes/          # Routes API
│       ├── signup.py
│       └── contact.py
├── pyproject.toml
└── README.md
```

### Ajouter une nouvelle route

1. Créer le fichier dans `app/routes/`
2. Définir les schémas dans `app/schemas.py`
3. Ajouter le router dans `app/main.py`
