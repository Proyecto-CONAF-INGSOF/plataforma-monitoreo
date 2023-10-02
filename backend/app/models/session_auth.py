from datetime import datetime
from typing import Optional


# Model SQL de las sessiones. Con esto los usuarios podran acceder
# a contenido restringido, si tienen una session activa en la BD
# y el token es valido.
class SessionAuth:
    id: Optional[int]
    user_id: int
    token: str
    created_at: datetime
    expires_in: int = 3600

    def __init__(self, user_id: int, token: str, created_at: datetime):
        self.user_id = user_id
        self.token = token
        self.created_at = created_at
