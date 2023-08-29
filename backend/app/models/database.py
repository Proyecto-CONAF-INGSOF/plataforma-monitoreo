import os

from dotenv import load_dotenv
from sqlmodel import Session, SQLModel, create_engine

# Cargamos las variables de entorno (a partir del archivo ".env")
load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_ADDRESS = os.getenv("DB_ADDRESS")

DB_CONAF_NAME = os.getenv("DB_CONAF_NAME")
DB_CONAF_PASSWORD = os.getenv("DB_CONAF_PASSWORD")
DB_CONAF_USER = os.getenv("DB_CONAF_USER")
DB_CONAF_ADDRESS = os.getenv("DB_CONAF_ADDRESS")

# Conectarse a base de datos de administradores PostgreSQL
engine = create_engine(f"postgresql://postgres:{DB_PASSWORD}@{DB_ADDRESS}/{DB_NAME}")

engine_conaf = create_engine(
    f"postgresql://{DB_CONAF_USER}:{DB_CONAF_PASSWORD}@{DB_ADDRESS}/{DB_CONAF_NAME}"
)


# Crear la base de datos y las tablas si no existen
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Obtener una sesión de la base de datos
def get_session():
    with Session(engine) as session:
        yield session
