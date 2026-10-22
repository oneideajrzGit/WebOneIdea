@echo off
title Servidor local One Idea (PHP)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0probar-local.ps1"
echo.
echo El servidor se detuvo. Si hubo un error, esta arriba.
pause
