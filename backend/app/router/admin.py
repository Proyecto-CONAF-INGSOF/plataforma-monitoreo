from app.crud.admin import crear_admin, obtener_admin, remover_token
from app.crud.database import get_session_admin
from app.models.admin import Admin
from app.router.utils import crear_token
from asyncpg import Connection
from asyncpg.connection import asyncpg
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from pydantic import BaseModel

router = APIRouter()


async def auth_middleware(user_token: str = Cookie(None)):
    if user_token == "fake-cookie-session-token":
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.post("/registro")
async def registro(admin: Admin, conn: Connection = Depends(get_session_admin)):
    _ = await auth_middleware()
    try:
        await crear_admin(admin, conn)
    except asyncpg.exceptions.UniqueViolationError:
        raise HTTPException(status_code=409, detail="Username o email ya existen")
    # Except invalid format
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Formato invalido")

    return HTTPException(status_code=200)


class LoginAdmin(BaseModel):
    email: str
    contrasena: str


@router.post("/login")
async def login(
    admin: LoginAdmin, response: Response, conn: Connection = Depends(get_session_admin)
):
    admin_db = await obtener_admin(admin.email, conn)
    if admin_db is None:
        raise HTTPException(status_code=404, detail="Usuario no existe")

    if admin_db.comparar_contrasena(admin.contrasena) is False:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    id = admin_db.id or 0
    admin_sess = await crear_token(id, conn)
    response.set_cookie(key="user_token", value=admin_sess.token)
    return "OK"


@router.get("/logout")
async def logout(
    response: Response,
    user_token: str = Cookie(None),
    conn: Connection = Depends(get_session_admin),
):
    if user_token is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    else:
        await remover_token(user_token, conn)
    response.delete_cookie(key="user_token")
    return {"message": "Cierre de sesión"}
