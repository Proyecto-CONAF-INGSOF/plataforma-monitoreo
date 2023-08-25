from typing import Optional
from sqlmodel import Field, SQLModel


# Modelo SQL de admin, id es opcional porque se genera automáticamente
class SessionAuth(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    token: str = Field(unique=True)
    created_at: int
    expires_in: int = Field(default=3600)
