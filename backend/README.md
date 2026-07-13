# SRIP Portal — Backend

Django REST API for the WSL Lab Student Research Internship Programme portal.

## Quick Start (any machine)

### 1. Clone & enter the directory
```bash
cd srip-portal/backend
```

### 2. Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up your environment file
```bash
cp .env.example .env
```
Now open `.env` in your editor and fill in **your own** email credentials:

| Variable | What to put |
|----------|------------|
| `EMAIL_HOST_USER` | Your Gmail address (e.g. `yourname@gmail.com`) |
| `EMAIL_HOST_PASSWORD` | A Gmail **App Password** (NOT your regular password) |
| `DEFAULT_FROM_EMAIL` | Same Gmail address |

#### How to get a Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Create a new app password → name it `SRIP Portal`
5. Copy the 16-character password into `EMAIL_HOST_PASSWORD` in `.env`

> **Note:** If you just want to test without sending real emails, change `EMAIL_BACKEND` in `.env` to:
> ```
> EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
> ```
> This prints emails to the terminal instead.

### 5. Run migrations
```bash
python manage.py migrate
```

### 6. Create an admin user (optional, for viewing submissions)
```bash
python manage.py createsuperuser
```

### 7. Start the server
```bash
python manage.py runserver 8001
```

### 8. Verify
- API: http://127.0.0.1:8001/api/positions/
- Admin panel: http://127.0.0.1:8001/admin/

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/positions/` | List all active internship positions |
| GET | `/api/positions/<id>/` | Get details of a single position |
| POST | `/api/applications/` | Submit an application (triggers welcome email) |

## Project Structure

```
backend/
├── .env.example        ← Copy to .env and fill in your credentials
├── manage.py
├── requirements.txt
├── srip/               ← Django project settings
│   ├── settings.py     ← Reads all config from .env
│   ├── urls.py
│   └── wsgi.py
└── api/                ← Main API app
    ├── models.py       ← Position & Application models
    ├── views.py        ← API views (list, detail, create)
    ├── serializers.py  ← DRF serializers
    ├── urls.py         ← API URL routing
    ├── admin.py        ← Admin panel configuration
    └── services/
        ├── email_service.py    ← Sends welcome email on form submission
        └── anumati_service.py  ← Pre-registers student on Anumati CMS
```

## Important
- **Never commit `.env`** — it contains your email password
- `.env` is already in `.gitignore`
- Each developer creates their own `.env` from `.env.example`
