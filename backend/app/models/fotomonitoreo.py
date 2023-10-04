from typing import Optional
from pydantic import BaseModel

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

    def create(self, row_names, grilla, nom_carpetas, num_individuos, fecha_hora, ano,
               fecha, hora, unidad_cod, unidad_sig, cod_especie, nom_cinesp, nom_comun,
               hora_ini, hora_fin):
        self.row_names = row_names
        self.grilla = grilla
        self.nom_carpetas = nom_carpetas
        self.num_individuos = num_individuos
        self.fecha_hora = fecha_hora
        self.ano = ano
        self.fecha = fecha
        self.hora = hora
        self.unidad_cod = unidad_cod
        self.unidad_sig = unidad_sig
        self.cod_especie = cod_especie
        self.nom_cinesp = nom_cinesp
        self.nom_comun = nom_comun
        self.hora_ini = hora_ini
        self.hora_fin = hora_fin
        
class Codigos_especie(BaseModel):
    id: Optional[int] = None
    row_names: str
    cod: str
    cod_e: str
    especie: str
    cientifico: str

    def create(self,row_names, cod, cod_e, especie, cientifico):
        self.row_names = row_names
        self.cod = cod 
        self.cod_e = cod_e
        self.especie = especie
        self.cientifico = cientifico

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

    def create(self, row_names, grilla, unidad_cod, ano, cod_especie, frecuencia,
               unidad_sig, x, y):
        self.row_names = row_names
        self.grilla = grilla
        self.unidad_cod = unidad_cod
        self.ano = ano
        self.cod_especie = cod_especie
        self.frecuencia = frecuencia
        self.unidad_sig = unidad_sig
        self.x = x
        self.y = y     

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

    def create(self, row_names, nom_comun, cod_especie, unidad_cod, unidad_sig, ano,
               hora, freq):
        self.row_names = row_names
        self.nom_comun = nom_comun
        self.cod_especie = cod_especie
        self.unidad_cod = unidad_cod
        self.unidad_sig = unidad_sig
        self.ano = ano
        self.hora = hora
        self.freq = freq

class Grillas(BaseModel):
    gid: int
    grilla: str
    unidad_sig: str
    unidad_cod: str
    geom: str

    def create(self, gid, grilla, unidad_sig, unidad_cod, geom):
        self.gid =  gid 
        self.grilla = grilla
        self.unidad_sig = unidad_sig
        self.unidad_cod = unidad_cod
        self.geom = geom 

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

    def create(self, row_names, pais, ord_region, nom_region, ano, unidad, unidad_sig,
               unidad_cod, nom_comun, cod_especie, amenaza):
        self.row_names = row_names
        self.pais = pais
        self.ord_region = ord_region
        self.nom_region = nom_region
        self.ano = ano
        self.unidad = unidad
        self.unidad_sig = unidad_sig
        self.unidad_cod = unidad_cod 
        self.nom_comun = nom_comun
        self.cod_especie = cod_especie
        self.amenaza = amenaza 

class Limites(BaseModel):
    gid: int
    unidad: str
    unidad_cat: str
    nom_region: str
    unidad_cod: str
    unidad_sig: int
    geom: str

    def create(self, gid, unidad, unidad_cat, nom_region, unidad_cod, unidad_sig, geom):
        self.gid = gid
        self.unidad = unidad
        self.unidad_cat = unidad_cat
        self.nom_region = nom_region
        self.unidad_cod = unidad_cod
        self.unidad_sig = unidad_sig
        self.geom = geom

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

    def create(self, row_names, nom_comun, cod_epecie, dias, naive, unidad_cod, unidad_sig,
               ano, superior, inferior):
        self.row_names = row_names
        self.nom_comun = nom_comun
        self.cod_especie = cod_epecie
        self.dias = dias 
        self.naive = naive
        self.unidad_cod = unidad_cod
        self.unidad_sig = unidad_sig 
        self.ano = ano
        self.superior = superior
        self.inferior = inferior

class Pngs(BaseModel):
    id: Optional[int] = None
    row_names: str
    nom_comun: str
    nom_cinesp: str
    cod_especie: str
    archivo: str

    def create(self, row_names, nom_comun, nom_cinesp, cod_especie, archivo):
        self.row_names = row_names
        self.nom_comun = nom_comun
        self.nom_cinesp = nom_cinesp
        self.cod_especie = cod_especie 
        self.archivo = archivo

class Url(BaseModel):
    id: Optional[int] = None
    row_names: str
    ano: int
    unidad_sig: int
    grilla: str
    url: str
    
    def create(self, row_names, ano, unidad_sig, grilla, url):
        self.row_names = row_names 
        self.ano = ano
        self.unidad_sig = unidad_sig 
        self.grilla = grilla
        self.url = url


