from app.models.admins import Admin

from fastapi import HTTPException, status
from psycopg2.errors import UniqueViolation
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlmodel import Session, select


async def crear_admin(admin: Admin, session: Session):
    admin.hashear_contrasena()
    session.add(admin)
    try:
        session.commit()
    except IntegrityError as e:
        assert isinstance(e.orig, UniqueViolation)
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El nombre de usuario o correo ya existe",
        )


async def obtener_admin(email: str, session: Session) -> Admin | None:
    statement = select(Admin).where(Admin.email == email)
    try:
        admin = session.exec(statement).first()
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el admin",
        )
    return admin
