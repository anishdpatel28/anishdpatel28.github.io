# Anish Patel - Portfolio Website

A modern portfolio website built with React, TypeScript, Material UI, and Django.

## Features

- **Frontend**: React with TypeScript, Material UI, Framer Motion
- **Backend**: Django REST Framework with PostgreSQL
- **Real-time page view tracking with animations**
- **Dark theme with custom color palette**
- **Responsive design**
- **Docker support**
- **CI/CD with CircleCI**

## 🚀 Quick Setup (New Computer)

### Prerequisites
Make sure you have installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Python 3.9+** - [Download here](https://www.python.org/downloads/)
- **npm** (comes with Node.js)

### 1. Download and Extract
1. Download the project from Google Drive
2. Extract to your desired folder
3. Open terminal/command prompt in the project folder

### 2. One-Command Setup
```bash
npm run setup
```

This automatically:
- ✅ Creates the `.env` file
- ✅ Installs frontend dependencies
- ✅ Creates Python virtual environment
- ✅ Installs backend dependencies
- ✅ Sets up the database

### 3. Start Development
```bash
npm start
```

**That's it!** Your portfolio will be running at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 🛠️ Manual Setup (If Needed)

If the automatic setup doesn't work, run these commands one by one:

```bash
# 1. Create environment file
cp env.config .env

# 2. Install root dependencies
npm install

# 3. Install frontend dependencies
cd frontend && npm install && cd ..

# 4. Set up Python backend
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..

# 5. Set up database
npm run backend:makemigrations
npm run backend:migrate

# 6. Start both servers
npm start
```

## 📜 Available Scripts

### Essential Commands
- `npm run setup` - **One-time setup for new computers**
- `npm start` - **Start both frontend and backend**
- `npm run reset` - **Clean everything and start fresh**

### Development
- `npm run dev` - Same as start
- `npm run frontend:dev` - Start frontend only
- `npm run backend:dev` - Start backend only

### Build & Test
- `npm run build` - Build frontend for production
- `npm test` - Run all tests
- `npm run lint` - Run linter

### Database
- `npm run backend:migrate` - Apply database changes
- `npm run backend:createsuperuser` - Create admin user

### Docker (Optional)
- `docker-compose up` - Start with Docker
- `docker-compose build` - Build Docker images

### Cleanup
- `npm run clean` - Remove all dependencies and build files

## 🗄️ Database Schema

The application uses PostgreSQL with this table for page view tracking:

```sql
CREATE TABLE pageviews_pageview (
    id SERIAL PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

## 🏗️ Project Structure

```
anishdpatel28.github.io/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── themes/          # Material UI themes
│   │   └── types/           # TypeScript types
│   └── dist/                # Build output
├── backend/                 # Django backend
│   ├── portfolio_backend/   # Django project settings
│   ├── pageviews/          # Page views app
│   └── venv/               # Python virtual environment
├── .circleci/              # CircleCI configuration
└── docker-compose.yml     # Docker configuration
```

## 🔧 Technologies Used

### Frontend
- React 18 with TypeScript
- Material UI (with custom dark theme)
- Framer Motion (animations)
- Vite (build tool)
- Axios (API calls)

### Backend
- Django 4.2
- Django REST Framework
- PostgreSQL (Neon database)
- Python 3.9+

### DevOps
- Docker & Docker Compose
- CircleCI (CI/CD)
- ESLint & Prettier

## 🌐 Environment Configuration

The `.env` file contains:
```env
DATABASE_URL=postgresql://...  # Neon database connection
SECRET_KEY=your-secret-key     # Django secret key
DEBUG=True                     # Debug mode
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

## 🚨 Troubleshooting

### Common Issues:

**"npm start" doesn't work:**
```bash
npm run reset  # Clean and start fresh
```

**Frontend shows blank page:**
- Check browser console (F12) for errors
- Ensure both servers are running
- Try refreshing the page

**Backend API errors:**
```bash
npm run backend:migrate  # Apply database changes
```

**Port already in use:**
- Frontend: Change port in `frontend/vite.config.ts`
- Backend: Use `python manage.py runserver 8001`

**Python virtual environment issues:**
```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 📱 Features

- **Page View Counter**: Animated counter in top-right corner
- **Navigation**: Dropdown menus for Projects → MacroKit → curlGUI/MacroBoard
- **Dark Theme**: Custom color palette using Material UI
- **Responsive**: Works on desktop and mobile
- **API Integration**: Real-time data from Django backend

## 🎯 Next Steps

1. **Create admin user**: `npm run backend:createsuperuser`
2. **Access admin panel**: http://localhost:8000/admin
3. **Add content**: Update components in `frontend/src/`
4. **Deploy**: Use Docker or build for production

## 📄 License

MIT License - see LICENSE file for details 