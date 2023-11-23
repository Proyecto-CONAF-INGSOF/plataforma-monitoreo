import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';

import { Actividad } from '@services/actividad';
import '@styles/Chart.css';

exporting(Highcharts);

const Superposicion: React.FC<{
  actividad1: Actividad[],
  actividad2: Actividad[],
  nombre_especie_1: string,
  nombre_especie_2: string,
}> = ({
  actividad1,
  actividad2,
  nombre_especie_1,
  nombre_especie_2,
}) => {
    // Todo: Marcar la superposicion de actividad
    const [options, setOptions] = useState<Highcharts.Options>({} as Highcharts.Options);
    useEffect(() => {
      const hc_options: Highcharts.Options = {
        credits: {
          enabled: false // Desactiva la atribución de Highcharts
        },
        title: {
          text: `Superposición de actividad: ${nombre_especie_1} y ${nombre_especie_2}`,
        },
        chart: {
          type: 'area',
        },
        xAxis: {
          title: {
            text: 'Hora del día'
          }
        },
        yAxis: {
          title: {
            text: 'Actividad'
          }
        },
        plotOptions: {
          line: {
            marker: {
              enabled: false
            },
          },
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
      };
      setOptions(hc_options);
    }, [actividad1, actividad2, nombre_especie_1, nombre_especie_2]);
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'chart'}
          containerProps={{ className: 'chart-superposicion' }}
        />
      </div>
    );
  };

export default Superposicion;
