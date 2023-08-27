from app.crud.admins import crear_admin, obtener_admin
from app.crud.session_auth import crear_token, eliminar_token, obtener_token
from app.models.admins import Admin
from app.models.database import get_session
from app.models.session_auth import SessionAuth
from app.schemas.admins import LoginAdmin
from fastapi import Cookie, Depends, HTTPException, Response, status
from fastapi.routing import APIRouter
from sqlmodel import Session

router = APIRouter()


async def auth_middleware(
    user_token: str = Cookie(None), session: Session = Depends(get_session)
) -> SessionAuth:
    # Si el usuario no tiene token, no puede pasar
    if user_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No autorizado",
        )
    session_row = await obtener_token(user_token, session)
    if session_row is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No autorizado",
        )
    return session_row


@router.post("/registro")
async def registro(
    admin: Admin,
    user_token: str = Cookie(None),
    session: Session = Depends(get_session),
):
    _ = await auth_middleware(user_token, session)
    # Creamos nuevo admin, hasing ocurre en el crud
    await crear_admin(admin, session)
    # Verificamos que el admin se haya creado
    session.refresh(admin)
    if admin:
        return {"message": "Admin creado exitosamente"}
    # Error 409
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="Admin no creado"
    )


# Inicio de sesión
@router.post("/login")
async def login(
    admin: LoginAdmin, response: Response, session: Session = Depends(get_session)
):
    # Creamos consulta, filtrado por email
    admin_db = await obtener_admin(admin.email, session)

    # Si el admin email existe en la base de datos
    if admin_db is not None:
        # Si las contrasenas coinciden
        if admin_db.comparar_contrasena(admin.contrasena):
            # Generamos token de session y la retornamos al usuario,
            # con esto podra pasar barrera de seguridad en middleware
            id = admin_db.id or 0
            admin_sess = await crear_token(id, session)
            # Verificamos que  el token se haya creado (con `session.refresh`)
            session.refresh(admin_sess)
            if admin_sess:
                response.set_cookie(
                    key="user_token",
                    value=admin_sess.token,
                )
                return "Success"
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Usuario o contraseña incorrectos",
    )


# Cerrar sesión
@router.post("/logout")
async def logout(
    response: Response,
    session: Session = Depends(get_session),
    user_token: str = Cookie(None),
):
    # Buscamos token en base de datos
    token_row = await obtener_token(user_token, session)
    if token_row is not None:
        # Eliminamos token de base de datos
        response.delete_cookie(key="user_token")
        await eliminar_token(token_row, session)
    # Exito al cerrar sesión
    return {"message": "Sesión cerrada exitosamente"}
