import secrets
import time

from app.models.session_auth import SessionAuth

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlmodel import Session, select


async def crear_token(user_id: int, session: Session) -> SessionAuth:
    # Generamos token de session y la retornamos al usuario,
    # con esto podra pasar barrera de seguridad en middleware
    token = secrets.token_urlsafe(32)
    created_at = int(time.time())
    admin_sess = SessionAuth(user_id=user_id, token=token, created_at=created_at)

    session.add(admin_sess)
    try:
        session.commit()
        return admin_sess
    except IntegrityError as _:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al crear token de sesión",
        )


async def obtener_token(token: str, session: Session) -> SessionAuth | None:
    token_row = select(SessionAuth).where(SessionAuth.token == token)
    try:
        token_db = session.exec(token_row).one()
    except NoResultFound as _:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Token no encontrado",
        )
    return token_db


async def eliminar_token(token: SessionAuth, session: Session):
    session.delete(token)
    try:
        session.commit()
    except Exception as _:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al eliminar token de sesión",
        )
