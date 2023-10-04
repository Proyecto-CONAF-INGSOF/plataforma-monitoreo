import secrets
import time
from datetime import datetime

from app.models.session_auth import SessionAuth
from asyncpg import Connection
from asyncpg.connection import asyncpg
from fastapi import HTTPException


async def crear_token(user_id: int, conn: Connection) -> SessionAuth:
    # Generamos token de session y la retornamos al usuario,
    # con esto podra pasar barrera de seguridad en middleware
    token = secrets.token_urlsafe(32)
    created_at = time.time()
    created_at = datetime.fromtimestamp(created_at)
    admin_sess = SessionAuth(user_id=user_id, token=token, created_at=created_at)

    try:
        await conn.execute(
            """
            INSERT INTO session_auth (user_id, token, created_at, expires_in)
            VALUES ($1, $2, $3, $4)
            """,
            admin_sess.user_id,
            admin_sess.token,
            admin_sess.created_at,
            3600,
        )
        return admin_sess
    except asyncpg.exceptions.UniqueViolationError:
        raise HTTPException(status_code=409, detail="Token ya existe")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error interno")
