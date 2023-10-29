import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { Actividad } from '../services/actividad';

const Superposicion: React.FC<{
  actividad1: Actividad[],
  actividad2: Actividad[],
  nombre_especie_1: string,
  nombre_especie_2: string,
  id: string,
}> = ({
  actividad1,
  actividad2,
  nombre_especie_1,
  nombre_especie_2,
  id
}) => {
    // Todo: Marcar la superposicion de actividad
    useEffect(() => {
      const options: Highcharts.Options = {
        title: {
          text: `Superposición de actividad: ${nombre_especie_1} y ${nombre_especie_2}`,
        },
        chart: {
          type: 'area',
        },
        xAxis: {
          title: {
            text: "Hora del día"
          }
        },
        yAxis: {
          title: {
            text: "Actividad"
          }
        },
        plotOptions: {
          line: {
            marker: {
              enabled: false
            },
          }
        },
        series: [
          {
            name: `Actividad ${nombre_especie_1}`,
            type: 'line',
            data: actividad1.map((a) => (a.Hora, a.Act_den)),
            showInLegend: true,
            color: '#a2e9e3'
          },
          {
            name: `Actividad ${nombre_especie_2}`,
            type: 'line',
            data: actividad2.map((a) => (a.Hora, a.Act_den)),
            showInLegend: true,
            color: '#82E0AA'
          }
        ]
      }
      Highcharts.chart(id, options);
    }, [id, actividad1, actividad2, nombre_especie_1, nombre_especie_2]);
    return (
      <div>
        <div id={id} />
      </div>
    )
  }

export default Superposicion;
