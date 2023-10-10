// Data type utlizado para almacenar los datos seleccionados por el usuario 
// en el sidebar. Cada field en el side bar corresponde a un atributo de esta
// interface. nombre_especie_1 y nombre_especie_2 son los nombres completos de las especies
export interface SidebarProps {
  region: string,
  unidad: string,
  anio: string,
  especie_1: string,
  especie_2: string,
  nombre_especie_1: string,
  nombre_especie_2: string
}

// Data type utilizada para el grafico rose chart en RoseChart.tsx 
// Este sirve para generar los graficos de Densidad horaria y Frecuencia Horaria
export interface RoseChartData {
  categories: string[];
  data: number[];
  title: string;
  subtitle: string;
}
