import bcrypt
import secrets
from fastapi import Depends, HTTPException, status
from fastapi.routing import APIRouter
from sqlmodel import Session, select
from app.models.admins import Admin
from app.models.database import get_session
from app.schemas.admins import LoginAdmin, NewAdmin
from sqlalchemy.exc import IntegrityError
from app.models.session import SessionAuth
from app.schemas.token import Token
import time

from psycopg2.errors import UniqueViolation


router = APIRouter()


@router.post("/registro")
async def registro(admin: NewAdmin, session: Session = Depends(get_session)):
    # Nuevo admin
    admin_db = Admin.from_new_admin(admin)
    session.add(admin_db)

    # Intentamos guardar en base de datos, posible error de
    # duplicidad de correo o nombre de usuario
    try:
        session.commit()
    except IntegrityError as e:
        # Chequeamos que el error es de duplicado
        assert isinstance(e.orig, UniqueViolation)
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El nombre de usuario o correo ya existe",
        )

    # Chequeamos que el admin se hay creado
    session.refresh(admin_db)
    if admin_db:
        return {"message": "Admin creado exitosamente"}
    # Error 409
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="Admin no creado"
    )


@router.post("/login")
async def login(admin: LoginAdmin, session: Session = Depends(get_session)):
    # Creamos consulta, filtrado por email
    statement = select(Admin).where(Admin.email == admin.email)
    admin_db = session.exec(statement).first()

    # Si el admin email existe en la base de datos
    if admin_db is not None:
        # Si las contrasenas coinciden
        if bcrypt.checkpw(
            admin.password.encode("utf-8"), admin_db.password.encode("utf-8")
        ):
            # Generamos token de session y la retornamos al usuario,
            # con esto podra pasar barrera de seguridad en middleware
            token = secrets.token_urlsafe(32)
            id = admin_db.id or 0
            created_at = int(time.time())
            admin_sess = SessionAuth(user_id=id, token=token, created_at=created_at)

            session.add(admin_sess)
            session.commit()
            session.refresh(admin_sess)

            return {"token": token}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Usuario o contraseña incorrectos",
    )


@router.post("/logout")
async def logout(token: Token, session: Session = Depends(get_session)):
    # Buscamos token en base de datos
    token_row = select(SessionAuth).where(SessionAuth.token == token.token)
    token_db = session.exec(token_row).one()

    if token_db is not None:
        # Eliminamos token de base de datos
        session.delete(token_db)
        try:
            session.commit()
        except Exception as _:
            # Si hay error, alertamos al usuario
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error al cerrar sesión",
            )

    # Exito al cerrar sesión
    return {"message": "Sesión cerrada exitosamente"}
