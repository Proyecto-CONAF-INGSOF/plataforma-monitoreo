import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

// Define un tipo para las opciones del gráfico de densidad
type DensityChartOptions = Highcharts.Options;

const DensityChart = () => {
    const data = [
        { time: '12 AM', density: 0.1 },
        { time: '1 AM', density: 0.2 },
        { time: '2 AM', density: 0.4 },
        { time: '3 AM', density: 0.5 },
        { time: '4 AM', density: 0.3 },
        { time: '5 AM', density: 0.1 },
        { time: '6 AM', density: 0.2 },
        { time: '7 AM', density: 0.3 },
        { time: '8 AM', density: 0.4 },
        { time: '9 AM', density: 0.5 },
        { time: '10 AM', density: 0.4 },
        { time: '11 AM', density: 0.3 },
        { time: '12 PM', density: 0.2 },
        { time: '1 PM', density: 0.1 },
        { time: '2 PM', density: 0.3 },
        { time: '3 PM', density: 0.4 },
        { time: '4 PM', density: 0.5 },
        { time: '5 PM', density: 0.4 },
        { time: '6 PM', density: 0.3 },
        { time: '7 PM', density: 0.2 },
        { time: '8 PM', density: 0.1 },
        { time: '9 PM', density: 0.2 },
        { time: '10 PM', density: 0.3 },
        { time: '11 PM', density: 0.4 },
      ];

  const categories = data.map(item => item.time);

  const options: DensityChartOptions = {
    credits: {
      enabled: false,
    },
    chart: {
      polar: true,
      type: 'column',
    },
    title: {
      text: 'Gráfico de Densidad Horaria',
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      max: 1, // Ajusta el rango máximo según tus datos de densidad
      title: {
        text: 'Densidad',
      },
    },
    series: [
      {
        type: 'column', // Especifica el tipo de gráfico
        name: 'Densidad',
        data: data.map(item => item.density),
        pointPlacement: 'between',
        color: '#98DDAE', // Puedes cambiar el color de la serie
      },
    ],
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
      },
      series:{
        stacking: 'normal',
        shadow: false,
        groupPadding: 0,
        pointPlacement: 'on'
      }
    },
  };

  useEffect(() => {
    Highcharts.chart('density-chart', options);
  }, []);

  return (
    <div>
      <h2>Gráfico de Densidad Horaria</h2>
      <div id="density-chart" style={{ width: '400px', height: '400px' }} />
    </div>
  );
};

export default DensityChart;
