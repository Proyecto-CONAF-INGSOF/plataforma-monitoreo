from asyncpg import Connection, Record
from fastapi import HTTPException


async def get_example(conn: Connection):
    try:
        query = "SELECT * from inputs limit 5;"
        result = await conn.fetch(query)
        # Process the result here (e.g., print it)
        print(result)
    except Exception as _:
        raise HTTPException(status_code=500, detail="Error inesperado")


async def get_superposicion_horaria(conn: Connection):
    try:
        query = "SELECT "
    except Exception as _:
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_regiones(conn: Connection):
    try:
        query = 'SELECT Distinct("Nom_region"), "Ord_region" FROM inputs'
        result = await conn.fetch(query, record_class=Record)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_unidades(region: int, conn: Connection):
    query = 'SELECT DISTINCT("Unidad"), "Unidad_COD", "Nom_region", "Ord_region"  FROM inputs WHERE "Ord_region" = $1'
    try:
        result = await conn.fetch(query, region, record_class=Record)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_anios(unidad: str, region: int, conn: Connection):
    query = 'SELECT DISTINCT("Ano") FROM inputs WHERE "Unidad_COD" = $1 AND "Ord_region" = $2'
    try:
        result = await conn.fetch(query, unidad, region, record_class=Record)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_especies(unidad: str, anio: int, region: int, conn: Connection):
    query = 'SELECT DISTINCT("Nom_comun"), "Unidad", "Ord_region", "Cod_especie", "Ano" FROM inputs WHERE "Ano" = $1 AND "Unidad_COD" = $2 AND "Ord_region" = $3'
    try:
        result = await conn.fetch(query, anio, unidad, region, record_class=Record)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")
