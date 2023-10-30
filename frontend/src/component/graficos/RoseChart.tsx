import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HcMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official'
import exporting from "highcharts/modules/exporting"

import { RoseChartData } from '@/types';

exporting(Highcharts);
HcMore(Highcharts);

const RoseChart: React.FC<{
  rs_data: RoseChartData,
}> = ({
  rs_data, // Datos que se van a graficar
}) => {
    const [options, setOptions] = useState<Highcharts.Options>({} as Highcharts.Options);
    // Use effect que se ejecuta cuando se actualiza el estado de rs_data (los datos 
    // que se van a graficar) rs_data puede cambiar porque el usuario cambio los datos seleccionados 
    // en el sidebar. Ver src/component/Sidebar.tsx funtion handleSubmit para mas detalles
    useEffect(() => {
      const categories = rs_data.categories;
      const data = rs_data.data;
      const hc_options: Highcharts.Options = {
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
      setOptions(hc_options);
    }, [rs_data]);

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'chart'}
        />
      </div>
    );
  };

export default RoseChart;
