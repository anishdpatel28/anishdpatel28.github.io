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

## Quick Setup

1. **Rename environment file:**
   ```bash
   mv env.config .env
   ```

2. **Install dependencies and set up database:**
   ```bash
   npm run setup
   ```

3. **Start development servers:**
   ```bash
   npm start
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:8000) servers.

## Available Scripts

### Development
- `npm start` - Start both frontend and backend servers
- `npm run dev` - Same as start
- `npm run frontend:dev` - Start frontend only
- `npm run backend:dev` - Start backend only

### Build
- `npm run build` - Build frontend for production
- `npm run frontend:build` - Build frontend

### Testing
- `npm test` - Run all tests
- `npm run frontend:test` - Run frontend tests
- `npm run backend:test` - Run backend tests
- `npm run frontend:test:watch` - Run frontend tests in watch mode
- `npm run frontend:test:coverage` - Run frontend tests with coverage

### Linting
- `npm run lint` - Run linter
- `npm run frontend:lint` - Run frontend linter

### Database
- `npm run backend:migrate` - Run database migrations
- `npm run backend:makemigrations` - Create new migrations
- `npm run backend:createsuperuser` - Create Django admin user

### Docker
- `docker-compose up` - Start all services with Docker
- `docker-compose build` - Build Docker images
- `docker-compose down` - Stop all services

### Cleanup
- `npm run clean` - Remove all build artifacts and dependencies

## Database Schema

The application uses PostgreSQL with the following table for page view tracking:

```sql
CREATE TABLE pageviews_pageview (
    id SERIAL PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

## Project Structure

```
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── themes/          # Material UI themes
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   └── dist/                # Build output
├── backend/                 # Django backend
│   ├── portfolio_backend/   # Django project settings
│   ├── pageviews/          # Page views app
│   └── venv/               # Python virtual environment
├── .circleci/              # CircleCI configuration
└── docker-compose.yml     # Docker configuration
```

## Technologies Used

### Frontend
- React 18
- TypeScript
- Material UI
- Framer Motion
- Vite
- ESLint
- Jest

### Backend
- Django 4.2
- Django REST Framework
- PostgreSQL
- Python 3.9+

### DevOps
- Docker
- CircleCI
- GitHub Actions

## Environment Variables

Create a `.env` file in the root directory with:

```env
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_django_secret_key
DEBUG=True
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and linting
6. Submit a pull request

## License

MIT License - see LICENSE file for details 