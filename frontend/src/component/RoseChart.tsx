import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HcMore from 'highcharts/highcharts-more';
import { RoseChartData } from '../types';

HcMore(Highcharts);

const RoseChart: React.FC<{
  rs_data: RoseChartData,
  id: string,
}> = ({
  rs_data, // Datos que se van a graficar
  id       // Id UNICO del elemento HTML donde se va a poner el grafico. 
}) => {
    // Use effect que se ejecuta cuando se actualiza el estado de rs_data (los datos 
    // que se van a graficar) rs_data puede cambiar porque el usuario cambio los datos seleccionados 
    // en el sidebar. Ver src/component/Sidebar.tsx funtion handleSubmit para mas detalles
    useEffect(() => {
      const setOptions = () => {
        const categories = rs_data.categories;
        const data = rs_data.data;
        const options: Highcharts.Options = {
          credits: {
            enabled: false // Desactiva la atribución de Highcharts
          },
          chart: {
            polar: true,
          },
          title: {
            text: rs_data.title,
          },
          // '#82E0AA'
          xAxis: {
            categories: categories,
            tickmarkPlacement: 'on',
            lineWidth: 3,
            lineColor: '#ccd6eb'
          },
          yAxis: {
            min: 0,
            lineWidth: 0,
            gridLineWidth: 1,
            gridLineInterpolation: 'polygon',
            title: {
              text: rs_data.subtitle,
            },
          },
          series: [
            {
              type: 'column',
              name: rs_data.subtitle,
              data: data,
              pointPlacement: 'between',
              color: '#82E0AA',
              pointWidth: 0.25,
              showInLegend: false,
            },
          ],
          plotOptions: {
            column: {
              pointPadding: 0,
              groupPadding: 0,
              borderWidth: 0,
            },
          },
          exporting: {
            enabled: true
          }
        };
        return options;
      }
      const options = setOptions();
      Highcharts.chart(id, options);
    }, [rs_data, id]);

    return (
      <div>
        <div id={id} style={{ width: '400px', height: '400px' }} />
      </div>
    );
  };

export default RoseChart;
