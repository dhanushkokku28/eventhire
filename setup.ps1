#!/usr/bin/env pwsh

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   EventHire - Complete Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "[1/5] Checking Node.js Installation..." -ForegroundColor Yellow
$nodeVersion = node -v
$npmVersion = npm -v
Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "npm: $npmVersion" -ForegroundColor Green
Write-Host ""

# Backend Setup
Write-Host "[2/5] Installing Backend Dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Backend npm install failed" -ForegroundColor Red
    exit 1
}
Set-Location ..
Write-Host "Backend dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Frontend Setup
Write-Host "[3/5] Installing Frontend Dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Frontend npm install failed" -ForegroundColor Red
    exit 1
}
Set-Location ..
Write-Host "Frontend dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Verify Config Files
Write-Host "[4/5] Verifying Configuration Files..." -ForegroundColor Yellow
$backendEnv = Test-Path "backend\.env"
$frontendEnv = Test-Path "frontend\.env.local"

if ($backendEnv) {
    Write-Host "Backend .env: OK" -ForegroundColor Green
} else {
    Write-Host "ERROR: backend\.env not found" -ForegroundColor Red
    exit 1
}

if ($frontendEnv) {
    Write-Host "Frontend .env.local: OK" -ForegroundColor Green
} else {
    Write-Host "ERROR: frontend\.env.local not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Summary
Write-Host "[5/5] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Ready to Start Development" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open TWO PowerShell Windows" -ForegroundColor White
Write-Host ""
Write-Host "TERMINAL 1 - Start Backend:" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "TERMINAL 2 - Start Frontend:" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "THEN:" -ForegroundColor Cyan
Write-Host "  Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
