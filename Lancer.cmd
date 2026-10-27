@echo off
rem Lance la formation dans le navigateur avec un petit serveur local.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js n'est pas installe : ouvrez simplement index.html dans votre navigateur.
  start "" "index.html"
  pause
  exit /b 0
)
node start-server.mjs
pause
