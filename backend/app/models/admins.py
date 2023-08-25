from typing import Optional
from sqlmodel import Field, SQLModel
import bcrypt

from app.schemas.admins import NewAdmin


# Modelo SQL de admin, id es opcional porque se genera automáticamente
class Admin(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str
    email: str = Field(unique=True)

    @staticmethod
    def from_new_admin(NewAdmin: NewAdmin):
        salt = bcrypt.gensalt(12)
        crypt_password = bcrypt.hashpw(NewAdmin.password.encode("utf-8"), salt)
        return Admin(
            username=NewAdmin.username,
            password=crypt_password.decode("utf-8"),
            email=NewAdmin.email,
        )
