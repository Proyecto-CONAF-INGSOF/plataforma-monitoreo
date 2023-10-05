import axios from "axios";

export interface Region {
    Nom_region: string;
    Ord_region: number;
}

async function getRegiones() {
    try {
        const {data, status} = await axios.get<Region[]>("http://localhost:8080/fotomonitoreo/regiones");
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Error message: ", error.message);
            return error.message;
        } else {
            console.log("Unexpected error: ", error);
            return 'Error inesperado';
        }
    }
}

export interface Unidad {
    Unidad: string;
    Unidad_COD: string;
    Nom_region: string;
    Ord_region: number;
}

async function getUnidades(region: string) {
    try {
        console.log("Region: ", region);
        const url = "http://localhost:8080/fotomonitoreo/regiones/" + region;
        console.log(url);
        const {data, status} = await axios.get<Unidad[]>(url);
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Error message: ", error.message);
            return error.message;
        } else {
            console.log("Unexpected error: ", error);
            return 'Error inesperado';
        }
    }
}

export interface Anio {
    Ano: number;
}
async function getAnios(region: string, unidad: string) {
    try {
        console.log("Region: ", region);
        console.log("Unidad: ", unidad);
        const url = "http://localhost:8080/fotomonitoreo/regiones/" + region + "/" + unidad;
        console.log(url);
        const {data, status} = await axios.get<Anio[]>(url);
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Error message: ", error.message);
            return error.message;
        } else {
            console.log("Unexpected error: ", error);
            return 'Error inesperado';
        }
    }
}

export interface Especie {
    Nom_comun: string;
    Unidad: string;
    Ord_region: number;
    Cod_especie: string;
    Ano: number;
}

async function getEspecies(region: string, unidad: string, anio: string) {
    try {
        console.log("Region: ", region);
        console.log("Unidad: ", unidad);
        console.log("Anio: ", anio);
        const url = "http://localhost:8080/fotomonitoreo/regiones/" + region + "/" + unidad + "/" + anio;
        console.log(url);
        const {data, status} = await axios.get<Especie[]>(url);
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Error message: ", error.message);
            return error.message;
        } else {
            console.log("Unexpected error: ", error);
            return 'Error inesperado';
        }
    }
}


export {getRegiones, getUnidades, getAnios, getEspecies};