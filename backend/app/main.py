from fastapi import FastAPI

from .router.admin import router as admin_router
from .router.fotomonitoreo import router as fotomonitoreo_router
app = FastAPI()

app.include_router(admin_router, prefix="/admin")
app.include_router(fotomonitoreo_router, prefix ="/fotomonitoreo") 
