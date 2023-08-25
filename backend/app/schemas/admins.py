from pydantic import BaseModel


class NewAdmin(BaseModel):
    username: str
    password: str
    email: str


class LoginAdmin(BaseModel):
    email: str
    password: str
