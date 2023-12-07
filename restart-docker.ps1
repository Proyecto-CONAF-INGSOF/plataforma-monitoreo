# Puede que para correr este script sea requerido ejecutar:
# Set-ExecutionPolicy RemoteSigned
# en powershell

docker-compose down -v --remove-orphans

# Build and start Docker containers
docker-compose up --build
