from typing import Optional

import bcrypt
from pydantic import BaseModel


class Admin(BaseModel):
    id: Optional[int] = None
    nombre: str
    apellido: str
    username: str
    contrasena: str
    email: str
    _contrasena_hasheada: Optional[bool] = False

    def create(self, nombre, apellido, username, contrasena, email):
        self.nombre = nombre
        self.apellido = apellido
        self.username = username
        self.contrasena = contrasena
        self.email = email
        self._contrasena_hasheada = False

    # Hashear la contrasena antes de guardar en base de datos
    def hashear_contrasena(self):
        salt = bcrypt.gensalt(12)
        self.contrasena = bcrypt.hashpw(self.contrasena.encode("utf-8"), salt).decode(
            "utf-8"
        )
        self._contrasena_hasheada = True

    # Comparar contrasena, esto compara la contrasena hasheada con la
    # contrasena que el usuario ingresa en el login
    def comparar_contrasena(self, contrasena: str) -> bool:
        return bcrypt.checkpw(
            contrasena.encode("utf-8"), self.contrasena.encode("utf-8")
        )
