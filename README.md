# Plataforma monitoreo

## Configuracion ambiente de desarrollo

Para configurar el ambiente de desarrollo, se debe tener `docker` instalado. Luego ejecutar el siguiente comando en la consola/terminal:

```bash
docker compose up --build
```

Esto iniciara los contenedores de desarrollo. Posterior a esto, todos los cambios en los directorios `backend` y `frontend` se veran reflejados en los contenedores.

## Agregar librerias a `frontend`

Para poder agregar librerias al directorio `frontend` se deben seguir dos pasos:

1. En primer lugar, entrar al contenedor del `frontend`

```
docker exec -it plataforma-monitoreo-frontend-1 bash # Entrar al contenedor del frontend
```

2. En segundo lugar, instalar la libreria en el contenedor. Por ejemplo si se desea instalar la libreria `chilean-rutify`, ejecutar los siguientes comandos desde su consola:

```bash
npm install chilean-rutify
exit
```
