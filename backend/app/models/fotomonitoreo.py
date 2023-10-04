from typing import Optional
from pydantic import BaseModel
import bcrypt

class Act(BaseModel):
    id: Optional[int] = None
    row_names: str
    nom_comun: str
    cod_especie: str
    unidad_cod: str
    unidad_sig: int
    ano: int
    hora: int
    act: int 

    def create(self, row_names, nom_comun, cod_especie, unidad_cod, unidad_sig, ano, hora, act):
        self.row_names = row_names
        self.nom_comun = nom_comun
        self.cod_especie = cod_especie
        self.unidad_cod = unidad_cod
        self.unidad_sig = unidad_sig
        self.ano = ano
        self.hora = hora
        self.act = act


    
class Act_over(BaseModel):
    id: Optional[int] = None
    row_names: str
    nom_comun: str
    unidad_cod: str
    ano: int
    hora: int
    act_den: int

    def create(self, row_names, nom_comun, unidad_cod, ano, hora, act_den):
        self.row_names = row_names
        self.nom_comun = nom_comun
        self.unidad_cod = unidad_cod
        self.ano = ano
        self.hora = hora
        self.act_den = act_den
    
class Base_de_datos(BaseModel):
    id: Optional[int] = None
    row_names: str
    grilla: str
    nom_carpetas: str
    num_individuos: str
    fecha_hora: str
    ano: int
    fecha: str
    hora: str
    unidad_cod: str
    unidad_sig: str
    cod_especie: str
    nom_cinesp: str
    nom_comun: str
    hora_ini: str
    hora_fin: str 

class Codigos_especie(BaseModel):
    id: Optional[int] = None
    row_names: str
    cod: str
    cod_e: str
    especie: str
    cientifico: str

class Frecuencia_grilla(BaseModel):
    id: Optional[int] = None
    row_names: str
    grilla:str
    unidad_cod:str
    ano: int
    cod_especie: str
    frecuencia: int
    unidad_sig: int
    x: int
    y: int

class Freq(BaseModel):
    id: Optional[int] = None
    row_names: str
    nom_comun: str
    cod_especie: str
    unidad_cod: str
    unidad_sig: str
    ano: int
    hora: int
    freq: int

class Grillas(BaseModel):
    id: gid[int]
    grilla: str
    unidad_sig: str
    unidad_cod: str
    geom: str

class Inputs(BaseModel):
    id: Optional[int] = None
    row_names: str
    pais: str
    ord_region: int
    nom_region: str
    ano: int
    unidad: str
    unidad_sig: int
    unidad_cod: str
    nom_comun: str
    cod_especie: str
    amenaza: str

class Limites(BaseModel):
    id: gid[int]
    unidad: str
    unidad_cat: str
    nom_region: str
    unidad_cod: str
    unidad_sig: int
    geom: str

class Occ(BaseModel):
    id: Optional[int] = None
    row_names: str 
    nom_comun: str
    cod_especie: str
    dias: int
    naive: int
    unidad_cod: str
    unidad_sig: int
    ano: int
    superior: int
    inferior: int

class Pngs(BaseModel):
    id: Optional[int] = None
    row_names: str
    nom_comun: str
    nom_cinesp: str
    cod_especie: str
    archivo: str

class Url(BaseModel):
    id: Optional[int] = None
    row_names: str
    ano: int
    unidad_sig: int
    grilla: str
    url: str