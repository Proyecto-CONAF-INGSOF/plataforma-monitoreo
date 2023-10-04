from app.models.fotomonitoreo import (Act,Act_over,Base_de_datos,Codigos_especie,
                                      Frecuencia_grilla,Freq,Grillas,Inputs,Limites,
                                      Occ,Pngs,Url)
from app.crud.database import get_session_fotomonitoreo
from asyncpg import Connection, Record
from fastapi import HTTPException

async def get_example(conn: Connection):
    try:
        query="SELECT * from inputs limit 5;"
        result = await conn.fetch(query)
        # Process the result here (e.g., print it)
        print(result)
    except:
        raise HTTPException