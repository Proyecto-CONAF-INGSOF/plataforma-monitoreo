import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { Ocupacion } from '../services/ocupacion_sitio';

const BoxPlotOcupacion: React.FC<{
  ocupacion: Ocupacion[],
  id: string,
}> = ({
  ocupacion,
  id
}) => {
    useEffect(() => {
      const series: Highcharts.SeriesOptionsType[] = []
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
      })
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
    }, [ocupacion, id]);
    return (
      <div>
        <div id={id} />
      </div>
    )
  }

export default BoxPlotOcupacion;
