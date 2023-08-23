from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from login import router


class Person(BaseModel):
    name: str
    last_name: str
    age: int


class AdminLogin(BaseModel):
    username: str
    password: str


app = FastAPI()

app.include_router(router, prefix="/admin", tags=["auth"])


@app.get("/")
async def root():
    x = "Some text"
    return {"message": x}


@app.post("/hello")
async def hello(person: Person):
    msg = f"Hello! {person.name}"
    if person.name == "alvaro":
        raise HTTPException(status_code=406, detail="Not acceptable")
    return {"message": msg}
