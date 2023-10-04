from app.crud.database import get_session_fotomonitoreo
from app.crud.fotomonitoreo import (get_example, obtener_anios,
                                    obtener_especies, obtener_regiones,
                                    obtener_unidades)
from asyncpg import Connection
from fastapi import APIRouter, Depends

router = APIRouter()


@router.get("")
async def idk(
    conn: Connection = Depends(get_session_fotomonitoreo),
):
    return await get_example(conn)


@router.get("/regiones")
async def get_regiones(conn: Connection = Depends(get_session_fotomonitoreo)):
    regiones = await obtener_regiones(conn)
    return regiones


@router.get("/regiones/{region}")
async def get_unidades(
    region: int, conn: Connection = Depends(get_session_fotomonitoreo)
):
    rows = await obtener_unidades(region, conn)
    return rows


@router.get("/regiones/{region}/{unidad}")
async def get_anios(
    region: int, unidad: str, conn: Connection = Depends(get_session_fotomonitoreo)
):
    rows = await obtener_anios(unidad, region, conn)
    return rows


@router.get("/regiones/{region}/{unidad}/{anio}")
async def get_especies(
    region: int,
    unidad: str,
    anio: int,
    conn: Connection = Depends(get_session_fotomonitoreo),
):
    rows = await obtener_especies(unidad, anio, region, conn)
    return rows
