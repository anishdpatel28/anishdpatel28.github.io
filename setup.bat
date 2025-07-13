@echo off
echo 🚀 Setting up Anish Patel Portfolio...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo ✅ Node.js and Python are installed
echo.

REM Step 1: Create .env file
echo 📄 Creating .env file...
if exist env.config (
    copy env.config .env >nul
    echo ✅ .env file created
) else (
    echo ⚠️ env.config file not found, please create .env manually
)
echo.

REM Step 2: Install root dependencies
echo 📦 Installing root dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)
echo ✅ Root dependencies installed
echo.

REM Step 3: Install frontend dependencies
echo 🎨 Installing frontend dependencies...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..
echo.

REM Step 4: Set up Python backend
echo 🐍 Setting up Python backend...
cd backend

REM Create virtual environment
python -m venv venv
if %errorlevel% neq 0 (
    echo ❌ Failed to create Python virtual environment
    pause
    exit /b 1
)
echo ✅ Python virtual environment created

REM Activate virtual environment and install dependencies
call venv\Scripts\activate.bat
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✅ Python dependencies installed

cd ..
echo.

REM Step 5: Set up database
echo 🗄️ Setting up database...
call npm run backend:makemigrations
call npm run backend:migrate
if %errorlevel% neq 0 (
    echo ❌ Failed to set up database
    pause
    exit /b 1
)
echo ✅ Database set up successfully
echo.

echo 🎉 Setup completed successfully!
echo.
echo To start the development servers, run:
echo   npm start
echo.
echo Your portfolio will be available at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo.
pause 