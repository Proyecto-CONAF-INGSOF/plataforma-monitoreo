import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import { Ocupacion } from '../services/ocupacion_sitio';

import exporting from "highcharts/modules/exporting"
import HighchartsReact from 'highcharts-react-official'

exporting(Highcharts);
const BoxPlotOcupacion: React.FC<{
  ocupacion: Ocupacion[],
}> = ({
  ocupacion,
}) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [options, setOptions] = useState<Highcharts.Options>({} as Highcharts.Options);

    const handleSelectionChange = (value: string) => {
      setSelectedValue(value);
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
        )
      });

      // Puedes usar selectedValue aquí para tomar decisiones basadas en la selección
      const hc_options: Highcharts.Options = {
        chart: {
          type: 'boxplot'
        },
        xAxis: {
          title: {
            text: 'Año'
          }
        },
        yAxis: {
          title: {
            text: 'Ocupación de sitio'
          },
          min: 0,
          max: 100,
        },
        title: {
          text: "Ocupación de sitio histórica"
        },
        legend: {
          enabled: false
        },
        series: series
      }
      setOptions(hc_options);
    }, [ocupacion]);

    return (
      <div>
        <div>
          <h2>Selecciona:</h2>
          <select value={selectedValue} onChange={(e) => handleSelectionChange(e.target.value)}>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'chart'}
        />
      </div>
    )
  }

export default BoxPlotOcupacion;
