from fastapi import FastAPI

from .router.admin import router

app = FastAPI()

app.include_router(router, prefix="/admin")
