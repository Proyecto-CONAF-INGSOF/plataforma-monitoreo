from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


class Person(BaseModel):
    name: str
    last_name: str
    age: int


app = FastAPI()


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
