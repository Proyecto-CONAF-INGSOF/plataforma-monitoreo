import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { Ocupacion } from '../services/ocupacion_sitio';

const BoxPlotOcupacion: React.FC<{
  ocupacion: Ocupacion[],
  id: string,
}> = ({
  ocupacion,
  id
}) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

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

      const options: Highcharts.Options = {
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
      Highcharts.chart(id, options);
    }, [ocupacion, id, selectedValue]);

    return (
      <div>
        <div id={id} />
        <div>
          <h2>Selecciona:</h2>
          <select value={selectedValue} onChange={(e) => handleSelectionChange(e.target.value)}>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            {/* Agrega más opciones según tus necesidades */}
          </select>
        </div>
      </div>
    )
}

export default BoxPlotOcupacion;
