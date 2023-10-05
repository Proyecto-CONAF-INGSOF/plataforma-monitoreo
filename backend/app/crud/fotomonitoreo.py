from re import escape
from asyncpg import Connection, Record
from fastapi import HTTPException
import json

async def get_example(conn: Connection):
    try:
        query = "SELECT * from inputs limit 5;"
        result = await conn.fetch(query)
        # Process the result here (e.g., print it)
        print(result)
    except Exception as _:
        raise HTTPException(status_code=500, detail="Error inesperado")

async def obtener_superposicion_horaria(especie1: str, especie2: str, conn: Connection):
    try:
        query1 = """SELECT b."Ano", b."Unidad_COD", b."Fecha_hora", b."Nom_comun", b."Hora", a."Act_den" 
                    FROM base_de_datos AS b
                    JOIN Act_over AS a ON b."row.names" = a."row.names" 
                    WHERE b."Nom_comun" = $1;"""

        query2 = """SELECT b."Ano", b."Unidad_COD", b."Fecha_hora", b."Nom_comun", b."Hora", a."Act_den" 
                    FROM base_de_datos AS b
                    JOIN Act_over AS a ON b."row.names" = a."row.names" 
                    WHERE b."Nom_comun" = $1;"""

        result1 = await conn.fetch(query1, especie1, record_class=Record)
        result2 = await conn.fetch(query2, especie2, record_class=Record)

        result1_json = json.dumps(result1, indent=4, default=str)
        result2_json = json.dumps(result2, indent=4, default=str)
        print(result1)

        return {
                "query1_result": json.loads(result1_json),
                "query2_result": json.loads(result2_json)
                }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")

async def obtener_actividad(unidad: str, anio: int,especie: str, conn: Connection):
    try:
        query = """ SELECT "Hora", "Act"
                    FROM act
                    WHERE "Unidad_COD" = $1 AND "Ano" = $2
                    AND "Cod_especie" = $3"""
        
        result = await conn.fetch(query, unidad, anio, especie, record_class=Record)

        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")
    

async def obtener_ocupacion_sitio(especie: str, conn: Connection):
    return

async def obtener_regiones(conn: Connection):
    try:
        query = 'SELECT Distinct("Nom_region") FROM inputs'
        result = await conn.fetch(query, record_class=Record)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_unidades(region: int, conn: Connection):
    query = 'SELECT DISTINCT("Unidad"), "Unidad_COD", "Nom_region"  FROM inputs WHERE "Ord_region" = $1'
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
    query = 'SELECT DISTINCT("Nom_comun") FROM inputs WHERE "Ano" = $1 AND "Unidad_COD" = $2 AND "Ord_region" = $3'
    try:
        result = await conn.fetch(query, anio, unidad, region, record_class=Record)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")
