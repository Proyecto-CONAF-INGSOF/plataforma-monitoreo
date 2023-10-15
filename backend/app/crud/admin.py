from app.models.admin import Admin
from asyncpg import Connection, Record


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


async def obtener_admin_por_id(id: int, conn: Connection) -> Admin | None:
    admin: Record | None = await conn.fetchrow(
        """
        SELECT * FROM admin WHERE id = $1
        """,
        id,
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
