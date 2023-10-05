from fastapi import APIRouter, Depends
from app.crud.fotomonitoreo import get_example
from asyncpg import Connection
from app.crud.database import get_session_fotomonitoreo
from app.crud.fotomonitoreo import (obtener_superposicion_horaria, obtener_anios,
                                    obtener_especies, obtener_regiones,
                                    obtener_unidades, obtener_actividad)
from asyncpg import Connection
from fastapi import APIRouter, Depends

router = APIRouter()


@router.get("/superposicion_horaria/{especie1}/{especie2}")
async def get_superposicion_horaria(
    especie1: str, especie2: str, conn: Connection = Depends(get_session_fotomonitoreo),
):
    r = await obtener_superposicion_horaria(especie1, especie2, conn)
    return r

@router.get("/actividad/{unidad}/{anio}/{especie}")
async def get_actividad(
    unidad: str, anio: int, especie: str, conn : Connection = Depends(get_session_fotomonitoreo),
):
    r = await obtener_actividad(unidad, anio, especie, conn)
    return r


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
