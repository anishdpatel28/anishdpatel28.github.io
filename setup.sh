#!/bin/bash

echo "🚀 Setting up Anish Patel Portfolio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 from https://www.python.org/"
    exit 1
fi

echo "✅ Node.js and Python 3 are installed"
echo ""

# Step 1: Create .env file
echo "📄 Creating .env file..."
if [ -f "env.config" ]; then
    cp env.config .env
    echo "✅ .env file created"
else
    echo "⚠️  env.config file not found, please create .env manually"
fi
echo ""

# Step 2: Install root dependencies
echo "📦 Installing root dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Root dependencies installed"
else
    echo "❌ Failed to install root dependencies"
    exit 1
fi
echo ""

# Step 3: Install frontend dependencies
echo "🎨 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo ""

# Step 4: Set up Python backend
echo "🐍 Setting up Python backend..."
cd backend

# Create virtual environment
python3 -m venv venv
if [ $? -eq 0 ]; then
    echo "✅ Python virtual environment created"
else
    echo "❌ Failed to create Python virtual environment"
    exit 1
fi

# Activate virtual environment and install dependencies
source venv/bin/activate
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo "✅ Python dependencies installed"
else
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

cd ..
echo ""

# Step 5: Set up database
echo "🗄️  Setting up database..."
npm run backend:makemigrations
npm run backend:migrate
if [ $? -eq 0 ]; then
    echo "✅ Database set up successfully"
else
    echo "❌ Failed to set up database"
    exit 1
fi
echo ""

echo "🎉 Setup completed successfully!"
echo ""
echo "To start the development servers, run:"
echo "  npm start"
echo ""
echo "Your portfolio will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "" 