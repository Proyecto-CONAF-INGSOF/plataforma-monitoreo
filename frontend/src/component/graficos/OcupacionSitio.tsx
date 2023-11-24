import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

import { Ocupacion } from '@services/ocupacion_sitio';

exporting(Highcharts);

const OcupacionSitio: React.FC<{
  ocupacion: Ocupacion[],
  especie: number,
  setChange: (dias: string, especie: number) => void
}> = ({
  ocupacion,
  especie,
  setChange
}) => {
    const [options, setOptions] = useState<Highcharts.Options>({} as Highcharts.Options);

    const handleSelectionChange = (value: string) => {
      setChange(value, especie);
      // Realiza cualquier acción adicional según el valor seleccionado
    };

    useEffect(() => {
      const series: Highcharts.SeriesOptionsType[] = [];
      ocupacion.map((occ) => {
        series.push(
          {
            pointWidth: 100,
            type: 'column',
            centerInCategory: true,
            data: [
              { x: occ.Ano, y: occ.Naive }
            ],
            color: '#82E0AA'
          },
        );
        series.push(
          {
            type: 'errorbar',
            centerInCategory: true,
            data: [
              {
                x: occ.Ano,
                low: occ.Inferior,
                high: occ.Superior
              }
            ]
          }
        );
      });

      // Puedes usar selectedValue aquí para tomar decisiones basadas en la selección
      const hc_options: Highcharts.Options = {
        credits: {
          enabled: false // Desactiva la atribución de Highcharts
        },
        chart: {
          type: 'bar'
        },
        xAxis: {
          title: {
            text: 'Nom_comun'
          }
        },
        yAxis: {
          title: {
            text: ''
          },
          min: 0,
          max: 100,
        },
        title: {
          text: 'Ocupación de sitio',
          align: 'left'
        },
        legend: {
          enabled: false
        },
        series: series
      };
      setOptions(hc_options);
    }, [ocupacion]);

    return (
      <div>
        <div>
          <h2>Selecciona:</h2>
          <select onChange={(e) => handleSelectionChange(e.target.value)} defaultValue={'30'}>
            <option value="30" >30 Días</option>
            <option value="60" >60 Días</option>
            <option value="90" >90 Días</option>
            <option value="120" >120 Días</option>
            <option value="365" >365 Días</option>
          </select>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'chart'}
        />
      </div>
    );
  };

export default OcupacionSitio;
