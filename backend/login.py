from fastapi import HTTPException
from fastapi.routing import APIRouter
from pydantic import BaseModel


from typing import Optional

from sqlmodel import Field, SQLModel


class Hero(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: Optional[int] = None


# from pydantic import BaseModel

router = APIRouter()

usuarios = {"alvaro": {"password": "1234", "email": "aparkerdf@protonmail.com"}}


class Admin(BaseModel):
    username: str
    password: str
    email: str


class AdminLogin(BaseModel):
    username: str
    password: str


@router.post("/registro")
async def registro(admin: Admin):
    # Do post to database
    return {"mensaje": f"{admin.username} {admin.email}"}


@router.post("/login")
async def login(admin: AdminLogin):
    if usuarios[admin.username] is None:
        # Http status request unauthorized
        raise HTTPException(status_code=401, detail="Unauthorized")
    else:
        if usuarios[admin.username]["password"] == admin.password:
            return {"mensaje": "Login exitoso"}
        else:
            raise HTTPException(status_code=401, detail="Unauthorized")
