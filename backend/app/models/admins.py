from typing import Optional

import bcrypt
from sqlmodel import Field, SQLModel


# Modelo SQL de admin, id es opcional porque se genera automáticamente
class Admin(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    apellido: str
    username: str = Field(unique=True)
    contrasena: str
    email: str = Field(unique=True)

    # Hashear la contrasena antes de guardar en base de datos
    def hashear_contrasena(self):
        salt = bcrypt.gensalt(12)
        self.contrasena = bcrypt.hashpw(self.contrasena.encode("utf-8"), salt).decode(
            "utf-8"
        )

    # Comparar contrasena, esto compara la contrasena hasheada con la
    # contrasena que el usuario ingresa en el login
    def comparar_contrasena(self, contrasena: str) -> bool:
        return bcrypt.checkpw(
            contrasena.encode("utf-8"), self.contrasena.encode("utf-8")
        )
