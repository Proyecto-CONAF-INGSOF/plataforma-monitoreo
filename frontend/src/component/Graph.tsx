import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HcMore from 'highcharts/highcharts-more';
import { SidebarProps } from '../types';
import { Actividad, getActividad } from '../services/actividad';

HcMore(Highcharts);

const WindroseChart: React.FC<{
  sidebar_props: SidebarProps,
}> = ({
  sidebar_props,
}) => {
    const fetchActividad = async () => {
      // LLamamos a la funcion getActividad con los datos del formulario, se nececita 
      // el codigo de la Unidad, el año y el codigo de la especie
      // Esta funcion puede retornar un objeto Actividad o un Error, por lo que puede ser
      // buena idea hacer un try catch para llamarla
      let actividad: Actividad[] = await getActividad(sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_1);
      return actividad;
    }
    const setOptions = (actividad: Actividad[]) => {
      const categories = actividad.map(item => item.Hora);
      let data = actividad.map(item => item.Act);

      const options: Highcharts.Options = {
        credits: {
          enabled: false // Desactiva la atribución de Highcharts
        },
        chart: {
          polar: true,
          type: 'column',
        },
        title: {
          text: 'Densidad Horaria' + ' ' + sidebar_props.especie_1,
        },
        xAxis: {
          categories: categories,
          lineWidth: 0,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Occ',
          },
        },
        series: [
          {
            type: 'column',
            name: 'Occ',
            data: data,
            pointPlacement: 'between',
            color: '#8884d8',

          },
        ],
        plotOptions: {
          column: {
            pointPadding: 0,
            groupPadding: 0,
            borderWidth: 0,
          },
        },
      };
      return options;
    }


    useEffect(() => {
      fetchActividad().then((actividad) => {
        let options = setOptions(actividad);
        Highcharts.chart('windrose-chart', options);
      });
    }, [sidebar_props]);

    return (
      <div>
        <div id="windrose-chart" style={{ width: '400px', height: '400px' }} />
      </div>
    );
  };

export default WindroseChart;
