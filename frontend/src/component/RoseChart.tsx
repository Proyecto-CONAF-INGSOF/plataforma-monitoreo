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
    const setOptions = () => {
      const categories = rs_data.categories;
      const data = rs_data.data;

      const options: Highcharts.Options = {
        credits: {
          enabled: false // Desactiva la atribución de Highcharts
        },
        chart: {
          polar: true,
          type: 'column',
        },
        title: {
          text: rs_data.title,
        },
        xAxis: {
          categories: categories,
          lineWidth: 0,
        },
        yAxis: {
          min: 0,
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


    // Use effect que se ejecuta cuando se actualiza el estado de rs_data (los datos 
    // que se van a graficar) rs_data puede cambiar porque el usuario cambio los datos seleccionados 
    // en el sidebar. Ver src/component/Sidebar.tsx funtion handleSubmit para mas detalles
    useEffect(() => {
      const options = setOptions();
      Highcharts.chart(id, options);
    }, [rs_data]);

    return (
      <div>
        <div id={id} style={{ width: '400px', height: '400px' }} />
      </div>
    );
  };

export default RoseChart;
