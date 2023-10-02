import os

from asyncpg import create_pool
from dotenv import load_dotenv

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_ADDRESS = os.getenv("DB_ADDRESS")

DB_CONAF_NAME = os.getenv("DB_CONAF_NAME")
DB_CONAF_PASSWORD = os.getenv("DB_CONAF_PASSWORD")
DB_CONAF_USER = os.getenv("DB_CONAF_USER")
DB_CONAF_ADDRESS = os.getenv("DB_CONAF_ADDRESS")

# Conectarse a base de datos de administradores PostgreSQL
url_admins = f"postgresql://postgres:{DB_PASSWORD}@{DB_ADDRESS}/{DB_NAME}"
url_conaf = (
    f"postgresql://postgres:{DB_CONAF_PASSWORD}@{DB_CONAF_ADDRESS}/{DB_CONAF_NAME}"
)

pool_conaf = create_pool(url_conaf)


async def get_session_admin():
    async with create_pool(url_admins) as pool:
        async with pool.acquire() as con:
            yield con
