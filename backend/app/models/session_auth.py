from typing import Optional

from sqlmodel import Field, SQLModel


# Model SQL de las sessiones. Con esto los usuarios podran acceder
# a contenido restringido, si tienen una session activa en la BD
# y el token es valido.
class SessionAuth(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    token: str = Field(unique=True)
    created_at: int
    expires_in: int = Field(default=3600)
