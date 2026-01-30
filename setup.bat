@echo off
echo.
echo ========================================
echo    EventHire - Complete Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [1/5] Checking Node.js...
node -v
npm -v
echo.

REM Setup Backend
echo [2/5] Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend npm install failed
    pause
    exit /b 1
)
cd ..
echo Backend dependencies installed successfully!
echo.

REM Setup Frontend
echo [3/5] Installing Frontend Dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend npm install failed
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

REM Verify .env files
echo [4/5] Verifying Configuration Files...
if exist "backend\.env" (
    echo Backend .env: OK
) else (
    echo ERROR: backend\.env not found
    pause
    exit /b 1
)

if exist "frontend\.env.local" (
    echo Frontend .env.local: OK
) else (
    echo ERROR: frontend\.env.local not found
    pause
    exit /b 1
)
echo.

REM Summary
echo [5/5] Setup Complete!
echo.
echo ========================================
echo    Ready to Start Development
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Open TWO Terminal Windows
echo.
echo TERMINAL 1 - Start Backend:
echo   cd backend
echo   npm run dev
echo.
echo TERMINAL 2 - Start Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo THEN:
echo   Open http://localhost:3000 in your browser
echo.
echo ========================================
echo.
pause
