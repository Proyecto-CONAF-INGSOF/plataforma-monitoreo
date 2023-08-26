from pydantic import BaseModel


# Clase para el inicio de session de administradores
class LoginAdmin(BaseModel):
    email: str
    contrasena: str
