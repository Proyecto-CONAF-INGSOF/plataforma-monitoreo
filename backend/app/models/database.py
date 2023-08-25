from dotenv import load_dotenv
import os

from sqlmodel import SQLModel, Session, create_engine


# Cargamos las variables de entorno (a partir del archivo ".env")
load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_ADDRESS = os.getenv("DB_ADDRESS")

engine = create_engine(f"postgresql://postgres:{DB_PASSWORD}@{DB_ADDRESS}/{DB_NAME}")


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
