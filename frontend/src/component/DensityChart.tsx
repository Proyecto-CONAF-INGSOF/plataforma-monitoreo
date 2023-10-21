import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

// Define un tipo para las opciones del gráfico de densidad
type DensityChartOptions = Highcharts.Options;

const DensityChart = () => {
    const data = [
        { time: '0 ', density: 0.1 },
        { time: '1 ', density: 0.2 },
        { time: '2 ', density: 0.4 },
        { time: '3 ', density: 0.5 },
        { time: '4 ', density: 0.3 },
        { time: '5 ', density: 0.1 },
        { time: '6 ', density: 0.2 },
        { time: '7 ', density: 0.3 },
        { time: '8 ', density: 0.4 },
        { time: '9 ', density: 0.5 },
        { time: '10 ', density: 0.4 },
        { time: '11 ', density: 0.3 },
        { time: '12 ', density: 0.2 },
        { time: '13 ', density: 0.1 },
        { time: '14 ', density: 0.3 },
        { time: '15 ', density: 0.4 },
        { time: '16 ', density: 0.5 },
        { time: '17 ', density: 0.4 },
        { time: '18 ', density: 0.3 },
        { time: '19 ', density: 0.2 },
        { time: '20 ', density: 0.1 },
        { time: '21 ', density: 0.2 },
        { time: '22 ', density: 0.3 },
        { time: '23 ', density: 0.4 },
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
      lineWidth: 4, // Ancho de línea del eje X
      lineColor:'#CED6E9',
      gridLineColor:'rgba(224,224,224)',
      labels: {
        style: {
          color: 'rgba(100,100,100)', // Color de las etiquetas del eje X
          fontSize: '12px', // Tamaño de fuente de las etiquetas
          fontWeight: 'light', // Peso de fuente de las etiquetas
        },
      },
    },
    yAxis: {
      min: 0,
      max: 1, // Ajusta el rango máximo según tus datos de densidad
      tickInterval: 0.09, // Controla la cantidad de gridlines en el eje Y
      gridLineInterpolation: 'plygon', // Configura las gridlines como rectas
      title: {
        enabled: false,
        text: 'Densidad',
      },
      plotBands: [
        {
          from: 0, // Valor inicial del nivel
          to: 0.18, // Valor final del nivel
          color: 'rgba(249, 249, 249)', // Color del área entre los niveles
        },
        {
          from: 0.36, // Valor inicial del nivel
          to: 0.54, // Valor final del nivel
          color: 'rgba(249, 249, 249)', // Color del área entre los niveles
        },
        {
          from: 0.72, // Valor inicial del nivel
          to: 0.9, // Valor final del nivel
          color: 'rgba(249, 249, 249)', // Color del área entre los niveles
        },
        // Agrega más plotBands según sea necesario
      ],
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
        pointPadding: 0.04,
        groupPadding: 0,
        borderWidth: 0.01,
      },
      series:{
        stacking: 'normal',
        shadow: false,
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
      <div id="density-chart" style={{ width: '600px', height: '450px' }} />
    </div>
  );
};

export default DensityChart;
