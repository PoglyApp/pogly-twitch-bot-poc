@echo off
@echo Building project...
call npm run build
cls
@echo Fixing extensions..
call npm run js-extensions
cls
@echo Running bot...
call npm run start 
echo.
pause