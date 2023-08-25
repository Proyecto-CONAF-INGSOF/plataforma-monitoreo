from fastapi import FastAPI
from app.models.database import create_db_and_tables


from app.routes.admins import router as admins_router


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(admins_router, prefix="/admin", tags=["auth"])
