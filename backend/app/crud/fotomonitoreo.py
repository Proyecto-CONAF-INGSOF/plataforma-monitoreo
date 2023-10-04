from asyncpg import Connection
from fastapi import HTTPException


async def get_example(conn: Connection):
    try:
        query = "SELECT * from inputs limit 5;"
        result = await conn.fetch(query)
        # Process the result here (e.g., print it)
        print(result)
    except Exception as _:
        raise HTTPException(status_code=500, detail="Error inesperado")

async def get_superposicion_horaria(conn:Connection):
    try:
        query = "SELECT "
    return