from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .router.admin import router as admin_router
from .router.fotomonitoreo import router as fotomonitoreo_router

app = FastAPI()

# ALlow CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router, prefix="/admin")
app.include_router(fotomonitoreo_router, prefix="/fotomonitoreo")
