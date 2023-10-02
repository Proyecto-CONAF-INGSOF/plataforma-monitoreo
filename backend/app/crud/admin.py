from app.models.admin import Admin
from asyncpg import Connection, Record
from fastapi import HTTPException


async def crear_admin(admin: Admin, conn: Connection):
    if admin._contrasena_hasheada is False:
        admin.hashear_contrasena()
    await conn.execute(
        """
        INSERT INTO admin (nombre, apellido, username, contrasena, email)
        VALUES ($1, $2, $3, $4, $5)
        """,
        admin.nombre,
        admin.apellido,
        admin.username,
        admin.contrasena,
        admin.email,
    )


async def obtener_admin(email: str, conn: Connection) -> Admin | None:
    admin: Record | None = await conn.fetchrow(
        """
        SELECT * FROM admin WHERE email = $1
        """,
        email,
        record_class=Record,
    )
    if admin is None:
        return None
    admin_new = Admin(
        id=admin["id"],
        nombre=admin["nombre"],
        apellido=admin["apellido"],
        username=admin["username"],
        contrasena=admin["contrasena"],
        email=admin["email"],
    )
    return admin_new


async def remover_token(token: str, conn: Connection):
    try:
        await conn.execute(
            """
            DELETE FROM session_auth WHERE token = $1
            """,
            token,
        )
    # Not found exception
    except Exception as _:
        raise HTTPException(status_code=500, detail="Error interno")
