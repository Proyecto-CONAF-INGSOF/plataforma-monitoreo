from datetime import datetime, timedelta
from typing import Annotated

from app.crud.admin import crear_admin, obtener_admin, obtener_admin_por_id
from app.crud.database import get_session_admin
from app.models.admin import Admin
from asyncpg import Connection
from asyncpg.connection import asyncpg
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/login")

# Generate random key: openssl rand -hex 32
SECRET_KEY = "76ac56b7e37d973c816a7218027fb68eb0b1aa869b8cb7c9bd3fb95f49ab5cae"
ALGORITHM = "HS256"
# Expire in 1 week
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7


class LoginAdmin(BaseModel):
    email: str
    contrasena: str


# Funcion para generar token de acceso
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            print("user_id is None")
            raise credential_exception
        return int(user_id)
    except JWTError as e:
        print(e)
        raise credential_exception


# Middleware de seguridad, esto restringe el acceso a las rutas
# a los usuarios que tengan un token valido
async def get_current_active_user(
    current_user: Annotated[int, Depends(get_current_user)],
    conn: Connection = Depends(get_session_admin),
) -> Admin | None:
    # Esto hace que las requests sean mas lentas pero es mas seguro
    # podemos eliminarlo si queremos que las requests sean mas rapidas a
    # costa de seguridad
    user = await obtener_admin_por_id(current_user, conn)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    conn: Connection = Depends(get_session_admin),
):
    admin_db = await obtener_admin(form_data.username, conn)
    if admin_db is None:
        raise HTTPException(status_code=404, detail="Usuario no existe")

    if admin_db.comparar_contrasena(form_data.password) is False:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    id = admin_db.id or 0

    token_data = {
        "sub": str(id),
        "nombre": admin_db.nombre,
        "apellido": admin_db.apellido,
        "email": admin_db.email,
    }

    admin_sess = create_access_token(token_data)
    return {
        "access_token": admin_sess,
        "token_type": "bearer",
    }


@router.post("/registro")
async def registro(
    admin: Admin,
    _: Annotated[Admin, Depends(get_current_active_user)],
    conn: Connection = Depends(get_session_admin),
):
    try:
        await crear_admin(admin, conn)
    except asyncpg.exceptions.UniqueViolationError:
        raise HTTPException(status_code=409, detail="Username o email ya existen")
    # Except invalid format
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Formato invalido")

    # Return 201 created
    return Response(status_code=201)


@router.get("/protected")
async def protected_route(
    _: Annotated[Admin, Depends(get_current_active_user)],
):
    return "OK"
