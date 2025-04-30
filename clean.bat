@echo off
echo Cleaning project...
cd /d %~dp0
timeout /t 1 /nobreak > nul

echo Killing any running node processes...
taskkill /F /IM node.exe > nul 2>&1

echo Removing node_modules directory...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo Project cleaned successfully!
echo Now you can run: npm install
echo Then run: npm start
pause