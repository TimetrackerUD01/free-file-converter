@echo off
echo ================================================
echo   Free File Converter - Quick Deploy Script
echo ================================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/win
    echo Then run this script again.
    pause
    exit /b 1
)

echo [INFO] Git is available
echo.

REM Change to project directory
cd /d "%~dp0"
echo [INFO] Current directory: %CD%
echo.

REM Check if it's already a Git repository
if not exist ".git" (
    echo [INFO] Initializing Git repository...
    git init
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to initialize Git repository
        pause
        exit /b 1
    )
) else (
    echo [INFO] Git repository already exists
)

REM Add all files
echo [INFO] Adding all files to Git...
git add .
if %errorlevel% neq 0 (
    echo [ERROR] Failed to add files to Git
    pause
    exit /b 1
)

REM Commit changes
echo [INFO] Committing changes...
git commit -m "Update: Fixed icon imports and ready for deployment - %date% %time%"
if %errorlevel% neq 0 (
    echo [WARNING] Nothing to commit or commit failed
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Adding GitHub remote...
    git remote add origin https://github.com/TimetrackerUD01/free-file-converter.git
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to add remote
        pause
        exit /b 1
    )
) else (
    echo [INFO] Remote origin already exists
)

REM Set main branch
echo [INFO] Setting main branch...
git branch -M main
if %errorlevel% neq 0 (
    echo [WARNING] Failed to set main branch
)

REM Push to GitHub
echo [INFO] Pushing to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo [ERROR] Failed to push to GitHub
    echo Make sure you have access to the repository
    echo Repository: https://github.com/TimetrackerUD01/free-file-converter.git
    pause
    exit /b 1
)

echo.
echo ================================================
echo   SUCCESS! Code uploaded to GitHub
echo ================================================
echo.
echo Repository: https://github.com/TimetrackerUD01/free-file-converter
echo.
echo Next steps:
echo 1. Go to Render.com
echo 2. Create new Web Service
echo 3. Connect GitHub repository
echo 4. Set build command: npm install ^&^& npm run build:client
echo 5. Set start command: npm start
echo 6. Add environment variables:
echo    - NODE_ENV=production
echo    - GOOGLE_ADSENSE_CLIENT=ca-pub-your-publisher-id
echo.
echo Press any key to open GitHub repository...
pause
start https://github.com/TimetrackerUD01/free-file-converter
