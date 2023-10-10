export interface SidebarProps {
  region: string,
  unidad: string,
  anio: string,
  especie_1: string,
  especie_2: string,
  nombre_especie_1: string,
  nombre_especie_2: string
}

export interface RoseChartData {
  categories: string[];
  data: number[];
  title: string;
  subtitle: string;
}
