from asyncpg import Connection, Record
from fastapi import HTTPException


async def obtener_densidad(unidad: str, anio: int, especie: str, conn: Connection):
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


# Todo: Esta tabla no tiene especie por id, solo por nombre comun
async def obtener_actividad(unidad: str, anio: int, especie: str, conn: Connection):
    # SELECT "Hora", "Act_den" FROM act_over WHERE "Unidad_COD" = 'MNCD' AND "Ano" = 2022 AND "Nom_comun" = 'Puma';
    # SELECT * FROM act_over WHERE "Unidad_COD" = 'PNVPR' AND "Ano" = 2022 AND "Nom_comun" = (SELECT DISTINCT("Nom_comun") FROM inputs WHERE "Cod_especie" = 'LOPR' LIMIT 1);
    try:
        query = 'SELECT "Hora", "Act_den" FROM act_over WHERE "Unidad_COD" = $1 AND "Ano" = $2 AND "Nom_comun" = (SELECT DISTINCT("Nom_comun") FROM inputs WHERE "Cod_especie" = $3 LIMIT 1)'

        result = await conn.fetch(query, unidad, anio, especie, record_class=Record)

        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_ocupacion_sitio(
    unidad: str, dias: int, especie: str, conn: Connection
) -> list[Record]:
    try:
        query = 'SELECT "Dias", "Naive", "Ano", "Superior", "Inferior" from occ WHERE "Cod_especie" = $1 AND "Dias" = $2 AND "Unidad_COD" = $3'
        result: list[Record] = await conn.fetch(
            query, especie, dias, unidad, record_class=Record
        )

        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_regiones(conn: Connection):
    try:
        query = 'SELECT Distinct("Nom_region"), "Ord_region" FROM inputs'
        result = await conn.fetch(query, record_class=Record)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")


async def obtener_freq_horaria(unidad: str, anio: int, especie: str, conn: Connection):
    query = 'SELECT "Hora", "Freq" FROM freq WHERE "Unidad_COD" = $1 AND "Ano" = $2 AND "Cod_especie" = $3'
    try:
        result = await conn.fetch(query, unidad, anio, especie, record_class=Record)
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


async def obtener_all_occ(unidad: str, anio: int, conn: Connection, dias = 30
) -> list[Record]:
    try:
        query = 'SELECT "Dias", "Naive", "Ano", "Superior", "Inferior", "Nom_comun" from occ WHERE "Dias" = $1 AND "Unidad_COD" = $2 AND "Ano" = $3'
        result: list[Record] = await conn.fetch(
            query, dias, unidad, anio, record_class=Record
        )

        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error inesperado")