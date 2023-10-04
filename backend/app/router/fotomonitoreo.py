from fastapi import APIRouter, Depends
from app.crud.fotomonitoreo import get_example
from asyncpg import Connection
from app.crud.database import get_session_fotomonitoreo
router = APIRouter()

@router.get("")
async def idk(conn: Connection = Depends(get_session_fotomonitoreo),):
    return await get_example(conn)