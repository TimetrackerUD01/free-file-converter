@echo off
echo.
echo ==========================================
echo   FREE FILE CONVERTER - DEPLOY SCRIPT
echo ==========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install main dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Building React application...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to build React app
    pause
    exit /b 1
)

cd ..

echo.
echo [4/4] Starting production server...
echo.
echo ==========================================
echo   BUILD SUCCESSFUL!
echo   Server starting on http://localhost:5000
echo ==========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
